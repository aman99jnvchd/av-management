
function updatePagination(total, page) {
    const totalPages = Math.ceil(total / perPage);
    const container = document.querySelector(".pagination-controls");
    container.innerHTML = "";

    let pages = [];

    // if total pages not more than 5
    if (totalPages <= 5) {
        pages = [...Array(totalPages).keys()].map(i => i + 1);
    } else {
        // Always include page 1
        pages.push(1);

        if (page <= 2) {
            pages.push(2, 3, 4, "...");
            pages.push(totalPages);
        } else if (page <= 4) {
            if (totalPages == 6) {
                pages.push("...", 3, 4, 5, 6);
            } else if (totalPages == 7) {
                pages.push("...", 3, 4, 5, 6, 7);
            } else {
                pages.push("...", 3, 4, 5, 6, "...", totalPages);
            }
        } else if (page < totalPages - 2) {
            pages.push(
                "...",
                page - 1,
                page,
                page + 1,
                page + 2,
                "...",
                totalPages
            );
        } else {
            pages.push(
                "...",
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages
            );
        }
    }

    // Previous button
    container.innerHTML += `
        <button class="page-btn" ${page === 1 ? "disabled" : ""} onclick="loadReportList(${page - 1}, ${perPage})">
            <i class="bi bi-chevron-left"></i>
        </button>
    `;

    // Render pages array
    pages.forEach(p => {
        if (p === "...") {
            container.innerHTML += `<span class="dots">...</span>`;
        } else {
            container.innerHTML += `
                <button class="page-btn ${p === page ? "active" : ""}" onclick="loadReportList(${p}, ${perPage})">
                    ${p}
                </button>
            `;
        }
    });

    // Next button
    container.innerHTML += `
        <button class="page-btn" ${page === totalPages ? "disabled" : ""} onclick="loadReportList(${page + 1}, ${perPage})">
            <i class="bi bi-chevron-right"></i>
        </button>
    `;

    // Update footer text
    const start = (page - 1) * perPage + 1;
    const end = Math.min(page * perPage, total);

    document.querySelector(".pagination-info").textContent = `Showing ${start} to ${end} of ${total} entries`;
}
