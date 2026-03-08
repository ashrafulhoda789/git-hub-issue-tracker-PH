let allIssues = [];

const createElement = (arr) =>{
    const htmlElement = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElement.join(" ");
}


const loadAllIssues = async() =>{
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    // console.log(data.data);
    allIssues = data.data;
    displayIssues(allIssues);

}

const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closeBtn");

const buttonToggle = (btns) =>{
    const buttons = document.querySelectorAll("#btnContainer button");

    buttons.forEach(btn =>{
        btn.classList.remove("btn-primary");
    })
    btns.classList.add("btn-primary");
}

allBtn.addEventListener('click',
    (event) =>{
        buttonToggle(event.target);
        displayIssues(allIssues);
    }
);

openBtn.addEventListener('click',
    (event) =>{
        buttonToggle(event.target);
        const openIssues = allIssues.filter(issue => issue.status === "open");
        // console.log(openIssues);
        displayIssues(openIssues);
    }
);

closedBtn.addEventListener('click',
    (event) =>{
        buttonToggle(event.target);
        const closedIssues = allIssues.filter(issue => issue.status === "closed");
        // console.log(openIssues);
        displayIssues(closedIssues);
    }
);

const displayIssues = (issues) =>{
    // console.log(issues);
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    const totalIssues = document.getElementById("totalIssues");
    totalIssues.innerText = issues.length + " Issues";

    issues.forEach(issue =>{
        // console.log(issue);
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="bg-white space-y-4 rounded-2xl p-5 border-t-4 ${issue.status.toUpperCase() === 'CLOSED' ? "border-[#A855F7]" : "border-[#00A96E]"}">
                <div class="flex justify-between items-center">
                    <img src="${issue.status.toUpperCase() === 'CLOSED' ? "assets/Closed- Status .png" : 'assets/Open-Status.png'}" alt="">
                    <p class="px-3 rounded-xl ${issue.priority.toUpperCase() === 'HIGH' ? "text-red-400 bg-red-100" : issue.priority.toUpperCase() === 'LOW' ? "text-gray-500 bg-gray-200":" text-yellow-500 bg-yellow-100"}  ">${issue.priority.toUpperCase()}</p>
                </div>
                <div class="space-y-2">
                    <h2 class="text-xl font-semibold dark-blue">${issue.title}</h2>
                    <p class="line-clamp-1 font-medium text-[#64748B]">${issue.description}</p>
                </div>
                <div>
                    ${createElement(issue.labels)}
                </div>
                <hr class="border-gray-200">
                <div class="flex justify-between items-center">
                    <p class="text-[#64748B]">#1 by ${issue.author}</p>
                    <p class="text-[#64748B]">${issue.updatedAt}</p>
                </div>
            </div>
        `;
        cardContainer.appendChild(card);
    })
};

loadAllIssues();