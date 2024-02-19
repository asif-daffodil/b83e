const studentInfo = {
    name: "Hamza",
    age: 23,
    city: "Dhaka",
    country: "Bangladesh",
    married: function (ans) {
        return ans + this.age;
    },
    gfList: ["Nadia", "Nusrat", "Nodi", "Nafisa"],
    skills: {
        html: true,
        css: true,
        js: true,
        node: true,
        react: true,
        mongo: true,
        php: false,
        python: false,
        mysQL: false
    }
}



console.log(studentInfo.name + " " + studentInfo.age + " " + studentInfo.city + " " + studentInfo.country + " " + studentInfo.married("No") + " " + studentInfo.gfList[0] + " " + studentInfo.skills.js);

// students info (array of json)

const students = [
    {
        name: "Kamal Mia",
        age: 23,
    },
    {
        name: "Jamal Mia",
        age: 25,
    },
    {
        name: "Rahim Mia",
        age: 27,
    },
    {
        name: "Karim Mia",
        age: 29,
    },
    {
        name: "Salam Mia",
        age: 30,
    }
]

console.log(students[1].age);

students.forEach((student) => {
    console.log(student.name + " " + student.age);
})

