

const loadAllIssues = async() =>{
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    // console.log(data.data);
    displayIssues(data.data);
}

const displayIssues = (issues) =>{
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    issues.forEach(issue =>{
        // console.log(issue);
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="bg-white space-y-4 rounded-2xl p-5">
                <div class="flex justify-between items-center">
                    <img src="assets/Open-Status.png" alt="">
                    <p>HIGH</p>
                </div>
                <div class="space-y-2">
                    <h2 class="text-xl font-semibold dark-blue">Fix navigation menu on mobile devices</h2>
                    <p class="line-clamp-2 font-medium text-[#64748B]">The navigation menu doesn't collapse properly on mobile devices...</p>
                </div>
                <div>
                    <button class="btn rounded-full">BUG</button>
                    <button class="btn rounded-full">HELP WANTED</button>
                </div>
                <hr class="border-gray-200">
                <div>
                    <p class="text-[#64748B]">#1 by john Doe</p>
                    <p class="text-[#64748B]">1/15/2024</p>
                </div>
            </div>
        `;
        cardContainer.appendChild(card);
    })
};

loadAllIssues();