import { randomBytes } from 'node:crypto';
import { getProperty } from 'dot-prop';
import inflection from 'inflection';
import sortOn from 'sort-on';
export function isItem(obj) {
    return typeof obj === 'object' && obj !== null;
}
export function isData(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    const data = obj;
    return Object.values(data).every((value) => Array.isArray(value) && value.every(isItem));
}
var Condition;
(function (Condition) {
    Condition["lt"] = "lt";
    Condition["lte"] = "lte";
    Condition["gt"] = "gt";
    Condition["gte"] = "gte";
    Condition["ne"] = "ne";
    Condition["default"] = "";
})(Condition || (Condition = {}));
function isCondition(value) {
    return Object.values(Condition).includes(value);
}
function ensureArray(arg = []) {
    return Array.isArray(arg) ? arg : [arg];
}
function embed(db, name, item, related) {
    if (inflection.singularize(related) === related) {
        const relatedData = db.data[inflection.pluralize(related)];
        if (!relatedData) {
            return item;
        }
        const foreignKey = `${related}Id`;
        const relatedItem = relatedData.find((relatedItem) => {
            return relatedItem['id'] === item[foreignKey];
        });
        return { ...item, [related]: relatedItem };
    }
    const relatedData = db.data[related];
    if (!relatedData) {
        return item;
    }
    const foreignKey = `${inflection.singularize(name)}Id`;
    const relatedItems = relatedData.filter((relatedItem) => relatedItem[foreignKey] === item['id']);
    return { ...item, [related]: relatedItems };
}
function nullifyForeignKey(db, name, id) {
    const foreignKey = `${inflection.singularize(name)}Id`;
    Object.entries(db.data).forEach(([key, items]) => {
        // Skip
        if (key === name)
            return;
        // Nullify
        if (Array.isArray(items)) {
            items.forEach((item) => {
                if (item[foreignKey] === id) {
                    item[foreignKey] = null;
                }
            });
        }
    });
}
function deleteDependents(db, name, dependents) {
    const foreignKey = `${inflection.singularize(name)}Id`;
    Object.entries(db.data).forEach(([key, items]) => {
        // Skip
        if (key === name || !dependents.includes(key))
            return;
        // Delete if foreign key is null
        if (Array.isArray(items)) {
            db.data[key] = items.filter((item) => item[foreignKey] !== null);
        }
    });
}
function randomId() {
    return randomBytes(2).toString('hex');
}
function fixItemsIds(items) {
    items.forEach((item) => {
        if (typeof item['id'] === 'number') {
            item['id'] = item['id'].toString();
        }
        if (item['id'] === undefined) {
            item['id'] = randomId();
        }
    });
}
// Ensure all items have an id
function fixAllItemsIds(data) {
    Object.values(data).forEach((value) => {
        if (Array.isArray(value)) {
            fixItemsIds(value);
        }
    });
}
export class Service {
    #db;
    constructor(db) {
        fixAllItemsIds(db.data);
        this.#db = db;
    }
    #get(name) {
        return this.#db.data[name];
    }
    has(name) {
        return Object.prototype.hasOwnProperty.call(this.#db?.data, name);
    }
    findById(name, id, query) {
        const value = this.#get(name);
        if (Array.isArray(value)) {
            let item = value.find((item) => item['id'] === id);
            ensureArray(query._embed).forEach((related) => {
                if (item !== undefined)
                    item = embed(this.#db, name, item, related);
            });
            return item;
        }
        return;
    }
    find(name, query = {}) {
        let items = this.#get(name);
        if (!Array.isArray(items)) {
            return items;
        }
        // Include
        ensureArray(query._embed).forEach((related) => {
            if (items !== undefined && Array.isArray(items)) {
                items = items.map((item) => embed(this.#db, name, item, related));
            }
        });
        // Return list if no query params
        if (Object.keys(query).length === 0) {
            return items;
        }
        // Convert query params to conditions
        const conds = {};
        for (const [key, value] of Object.entries(query)) {
            if (value === undefined || typeof value !== 'string') {
                continue;
            }
            const re = /_(lt|lte|gt|gte|ne)$/;
            const reArr = re.exec(key);
            const op = reArr?.at(1);
            if (op && isCondition(op)) {
                const field = key.replace(re, '');
                conds[field] = [op, value];
                continue;
            }
            if ([
                '_embed',
                '_sort',
                '_start',
                '_end',
                '_limit',
                '_page',
                '_per_page',
            ].includes(key)) {
                continue;
            }
            conds[key] = [Condition.default, value];
        }
        // Loop through conditions and filter items
        const res = items.filter((item) => {
            for (const [key, [op, paramValue]] of Object.entries(conds)) {
                if (paramValue && !Array.isArray(paramValue)) {
                    // https://github.com/sindresorhus/dot-prop/issues/95
                    const itemValue = getProperty(item, key);
                    switch (op) {
                        // item_gt=value
                        case Condition.gt: {
                            if (!(typeof itemValue === 'number' &&
                                itemValue > parseInt(paramValue))) {
                                return false;
                            }
                            break;
                        }
                        // item_gte=value
                        case Condition.gte: {
                            if (!(typeof itemValue === 'number' &&
                                itemValue >= parseInt(paramValue))) {
                                return false;
                            }
                            break;
                        }
                        // item_lt=value
                        case Condition.lt: {
                            if (!(typeof itemValue === 'number' &&
                                itemValue < parseInt(paramValue))) {
                                return false;
                            }
                            break;
                        }
                        // item_lte=value
                        case Condition.lte: {
                            if (!(typeof itemValue === 'number' &&
                                itemValue <= parseInt(paramValue))) {
                                return false;
                            }
                            break;
                        }
                        // item_ne=value
                        case Condition.ne: {
                            switch (typeof itemValue) {
                                case 'number':
                                    return itemValue !== parseInt(paramValue);
                                case 'string':
                                    return itemValue !== paramValue;
                                case 'boolean':
                                    return itemValue !== (paramValue === 'true');
                            }
                            break;
                        }
                        // item=value
                        case Condition.default: {
                            switch (typeof itemValue) {
                                case 'number':
                                    return itemValue === parseInt(paramValue);
                                case 'string':
                                    return itemValue === paramValue;
                                case 'boolean':
                                    return itemValue === (paramValue === 'true');
                            }
                        }
                    }
                }
            }
            return true;
        });
        // Sort
        const sort = query._sort || '';
        const sorted = sortOn(res, sort.split(','));
        // Slice
        const start = query._start;
        const end = query._end;
        const limit = query._limit;
        if (start !== undefined) {
            if (end !== undefined) {
                return sorted.slice(start, end);
            }
            return sorted.slice(start, start + (limit || 0));
        }
        if (limit !== undefined) {
            return sorted.slice(0, limit);
        }
        // Paginate
        let page = query._page;
        const perPage = query._per_page || 10;
        if (page) {
            const items = sorted.length;
            const pages = Math.ceil(items / perPage);
            // Ensure page is within the valid range
            page = Math.max(1, Math.min(page, pages));
            const first = 1;
            const prev = page > 1 ? page - 1 : null;
            const next = page < pages ? page + 1 : null;
            const last = pages;
            const start = (page - 1) * perPage;
            const end = start + perPage;
            const data = sorted.slice(start, end);
            return {
                first,
                prev,
                next,
                last,
                pages,
                items,
                data,
            };
        }
        return sorted.slice(start, end);
    }
    async create(name, data = {}) {
        const items = this.#get(name);
        if (items === undefined || !Array.isArray(items))
            return;
        const item = { id: randomId(), ...data };
        items.push(item);
        await this.#db.write();
        return item;
    }
    async #updateOrPatch(name, body = {}, isPatch) {
        const item = this.#get(name);
        if (item === undefined || Array.isArray(item))
            return;
        const nextItem = (this.#db.data[name] = isPatch ? { item, ...body } : body);
        await this.#db.write();
        return nextItem;
    }
    async #updateOrPatchById(name, id, body = {}, isPatch) {
        const items = this.#get(name);
        if (items === undefined || !Array.isArray(items))
            return;
        const item = items.find((item) => item['id'] === id);
        if (!item)
            return;
        const nextItem = isPatch ? { ...item, ...body, id } : { ...body, id };
        const index = items.indexOf(item);
        items.splice(index, 1, nextItem);
        await this.#db.write();
        return nextItem;
    }
    async update(name, body = {}) {
        return this.#updateOrPatch(name, body, false);
    }
    async patch(name, body = {}) {
        return this.#updateOrPatch(name, body, true);
    }
    async updateById(name, id, body = {}) {
        return this.#updateOrPatchById(name, id, body, false);
    }
    async patchById(name, id, body = {}) {
        return this.#updateOrPatchById(name, id, body, true);
    }
    async destroyById(name, id, dependent) {
        const items = this.#get(name);
        if (items === undefined || !Array.isArray(items))
            return;
        const item = items.find((item) => item['id'] === id);
        if (item === undefined)
            return;
        const index = items.indexOf(item);
        items.splice(index, 1)[0];
        nullifyForeignKey(this.#db, name, id);
        const dependents = ensureArray(dependent);
        deleteDependents(this.#db, name, dependents);
        await this.#db.write();
        return item;
    }
}
