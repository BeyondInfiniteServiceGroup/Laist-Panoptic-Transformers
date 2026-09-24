(() => {
    const cards = [...document.querySelectorAll("[data-product-card]")];
    const search = document.querySelector("[data-product-search]");
    const filter = document.querySelector("[data-product-filter]");
    const showAllButton = document.querySelector("[data-show-more-products]");
    const productField = document.querySelector("[data-product-field]");

    let expanded = false;

    const updateProducts = () => {
        const query = (search?.value || "").trim().toLowerCase();
        const category = filter?.value || "all";
        const filtering = query.length > 0 || category !== "all";

        cards.forEach((card) => {
            const productName = (card.dataset.productName || "").toLowerCase();
            const cardText = card.textContent.toLowerCase();
            const cardCategory = card.dataset.category || "";

            const matchesSearch =
                !query ||
                productName.includes(query) ||
                cardText.includes(query);

            const matchesCategory =
                category === "all" ||
                cardCategory === category;

            const isExtra = card.hasAttribute("data-product-extra");

            // Extra cards are hidden only in the default collapsed "All Products" view.
            const visibleByLimit =
                expanded ||
                !isExtra ||
                filtering;

            const visible =
                matchesSearch &&
                matchesCategory &&
                visibleByLimit;

            card.hidden = !visible;

            // Existing CSS uses this class to override .product-card-extra { display: none; }.
            if (isExtra) {
                card.classList.toggle("is-shown", visible);
            }
        });

        if (showAllButton) {
            showAllButton.hidden = filtering;
            showAllButton.textContent = expanded
                ? "Show Featured Products"
                : "Show All Products";
            showAllButton.setAttribute(
                "aria-expanded",
                String(expanded)
            );
        }
    };

    search?.addEventListener("input", updateProducts);
    filter?.addEventListener("change", updateProducts);

    showAllButton?.addEventListener("click", () => {
        expanded = !expanded;
        updateProducts();
    });

    document
        .querySelectorAll("[data-enquire-product]")
        .forEach((link) => {
            link.addEventListener("click", () => {
                if (productField) {
                    productField.value =
                        link.dataset.enquireProduct || "";
                }
            });
        });

    updateProducts();
})();
