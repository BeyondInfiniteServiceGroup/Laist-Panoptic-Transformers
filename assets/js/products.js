(() => {
    const cards = [...document.querySelectorAll('[data-product-card]')];
    const search = document.querySelector('[data-product-search]');
    const filter = document.querySelector('[data-product-filter]');
    const showMoreButton = document.querySelector('[data-show-more-products]');
    const productField = document.querySelector('[data-product-field]');

    let expanded = false;

    const updateProducts = () => {
        const query = (search?.value || '')
            .trim()
            .toLowerCase();

        const category = filter?.value || 'all';

        const filtering =
            Boolean(query) ||
            category !== 'all';

        cards.forEach((card) => {
            const matchesSearch = card.textContent
                .toLowerCase()
                .includes(query);

            const matchesCategory =
                category === 'all' ||
                card.dataset.category === category;

            const isExtra =
                card.hasAttribute('data-product-extra');

            const visibleByLimit =
                expanded ||
                !isExtra ||
                filtering;

            const visible =
                matchesSearch &&
                matchesCategory &&
                visibleByLimit;

            card.hidden = !visible;

            if (isExtra) {
                card.classList.toggle('is-shown', visible);
            }
        });

        if (showMoreButton) {
            showMoreButton.hidden = filtering;

            showMoreButton.textContent = expanded
                ? 'Show Fewer Products'
                : 'Show More Products';

            showMoreButton.setAttribute(
                'aria-expanded',
                String(expanded)
            );
        }
    };

    search?.addEventListener('input', updateProducts);

    filter?.addEventListener('change', updateProducts);

    showMoreButton?.addEventListener('click', () => {
        expanded = !expanded;
        updateProducts();
    });

    document
        .querySelectorAll('[data-enquire-product]')
        .forEach((link) => {
            link.addEventListener('click', () => {
                if (productField) {
                    productField.value =
                        link.dataset.enquireProduct || '';
                }
            });
        });

    updateProducts();
})();