let allIssues = [];

const createElement = (arr) =>{
    const htmlElement = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElement.join(" ");
}

const loadSpinner = (status) =>{
    if(status === true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("cardContainer").classList.add("hidden");
    }
    else{
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("cardContainer").classList.remove("hidden");
    }
}




const loadAllIssues = async() =>{
    loadSpinner(true);
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

const loadIssuesDetails = async(id) =>{
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);

    const data = await res.json();
    displayModal(data.data);
}

const displayModal = (issue) =>{
    console.log(issue);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
        <div class="space-y-5">
            <div>
                <h1 class="text-2xl dark-blue font-bold">${issue.title}</h1>
            </div>
            <div class="flex items-center gap-10">
                <p class=" rounded-2xl p-2 ${issue.status.toUpperCase() === 'CLOSED' ? "text-[#A855F7] bg-purple-100" : "text-[#00A96E] bg-green-100"}">${issue.status}</p>
                <li>Open By: ${issue.author}</li>
                <li>${issue.createdAt}</li>
            </div>
            <div>
                ${createElement(issue.labels)}
            </div>

            <div>
                <p class="text-[#64748B]">${issue.description}</p>
            </div>
            <div class="flex justify-between items-center px-5 py-2 bg-gray-100 rounded-lg">
                <div>
                    <h2 class="text-[#64748B]">Assignee:</h2>
                    <h2 class="dark-blue font-semibold">${issue.assignee}</h2>
                </div>
                <div class="flex flex-col justify-center">
                    <h2 class="text-[#64748B]">Priority:</h2>
                    <p class="px-3 py-2 rounded-xl font-medium ${issue.priority.toUpperCase() === 'HIGH' ? "text-red-400 bg-red-100" : issue.priority.toUpperCase() === 'LOW' ? "text-gray-600 bg-gray-200":" text-yellow-600 bg-yellow-100"}">${issue.priority}</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById("issue_modal").showModal();
}

const displayIssues = (issues) =>{
    // console.log(issues);
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    if(issues.length === 0){
        loadSpinner(false);
        return;
    }

    const totalIssues = document.getElementById("totalIssues");
    totalIssues.innerText = issues.length + " Issues";

    issues.forEach(issue =>{
        // console.log(issue);
        const card = document.createElement("div");
        card.innerHTML = `
            <div onclick="loadIssuesDetails(${issue.id})" class="bg-white space-y-4 rounded-2xl p-5 border-t-4 ${issue.status.toUpperCase() === 'CLOSED' ? "border-[#A855F7]" : "border-[#00A96E]"}">
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
    });
    loadSpinner(false);
};

loadAllIssues();

document.getElementById("searchBtn").addEventListener('click',
    () =>{
        const input = document.getElementById("input-search");
        const inputValue = input.value.trim().toLowerCase();
        // console.log(inputValue);

        fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`)
        .then((res) => res.json())
        .then((data) => {
            const allIssues = data.data;
            
            displayIssues(allIssues);
        })
    }
);