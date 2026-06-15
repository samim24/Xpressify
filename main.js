document.addEventListener("DOMContentLoaded", function() {

    // ============================================================
    // 1. OFF-CANVAS DRAWER (SIDEBAR) - works on all pages
    // ============================================================
    const drawerOpenAction = document.getElementById("drawerOpenAction");
    const drawerCloseAction = document.getElementById("drawerCloseAction");
    const drawerPanelContainer = document.getElementById("drawerPanelContainer");
    const drawerBackdropMesh = document.getElementById("drawerBackdropMesh");

    if (drawerOpenAction && drawerCloseAction && drawerPanelContainer && drawerBackdropMesh) {
        function activateDrawer() {
            drawerPanelContainer.classList.add("active-drawer");
            drawerBackdropMesh.classList.add("active-backdrop");
            document.body.style.overflow = "hidden";
        }

        function deactivateDrawer() {
            drawerPanelContainer.classList.remove("active-drawer");
            drawerBackdropMesh.classList.remove("active-backdrop");
            document.body.style.overflow = "auto";
        }

        drawerOpenAction.addEventListener("click", activateDrawer);
        drawerCloseAction.addEventListener("click", deactivateDrawer);
        drawerBackdropMesh.addEventListener("click", deactivateDrawer);
    }

    // ============================================================
    // 2. FULLSCREEN SEARCH OVERLAY - works on all pages
    // ============================================================
    const searchOpenAction = document.getElementById("searchOpenAction");
    const searchCloseAction = document.getElementById("searchCloseAction");
    const searchOverlayDeck = document.getElementById("searchOverlayDeck");
    const globalSearchInput = document.getElementById("globalSearchInput");

    if (searchOpenAction && searchCloseAction && searchOverlayDeck && globalSearchInput) {
        searchOpenAction.addEventListener("click", function() {
            searchOverlayDeck.classList.add("active-search");
            setTimeout(() => globalSearchInput.focus(), 300);
        });

        searchCloseAction.addEventListener("click", function() {
            searchOverlayDeck.classList.remove("active-search");
        });
    }

    // ============================================================
    // 3. FEATURED SLIDER (ONLY on index.html - checks for elements)
    // ============================================================
    const sliderWrapper = document.getElementById("sliderWrapper");
    const sliderDots = document.querySelectorAll(".slider-dot");

    if (sliderWrapper && sliderDots.length > 0) {
        let activeSlideIndex = 0;
        const totalSlidesCount = sliderDots.length;
        let slideIntervalCycle;

        function renderActiveSlide(index) {
            sliderWrapper.style.transform = `translateX(-${index * 33.33333}%)`;
            sliderDots.forEach(dot => dot.classList.remove("active-dot"));
            sliderDots[index].classList.add("active-dot");
            activeSlideIndex = index;
        }

        function triggerAutomaticCycle() {
            slideIntervalCycle = setInterval(() => {
                let nextSlide = (activeSlideIndex + 1) % totalSlidesCount;
                renderActiveSlide(nextSlide);
            }, 5000);
        }

        sliderDots.forEach(dot => {
            dot.addEventListener("click", function() {
                clearInterval(slideIntervalCycle);
                const chosenIndex = parseInt(this.getAttribute("data-index"));
                renderActiveSlide(chosenIndex);
                triggerAutomaticCycle();
            });
        });

        triggerAutomaticCycle();
    }

    // ============================================================
    // 4. ASYNC "LOAD MORE" BUTTON (ONLY on index.html)
    // ============================================================
    const paginationAsyncTrigger = document.getElementById("paginationAsyncTrigger");
    const articlesHydrationGrid = document.getElementById("articlesHydrationGrid");
    const asyncLoadingSpinnerIcon = document.getElementById("asyncLoadingSpinnerIcon");
    const asyncBtnTextLabel = document.getElementById("asyncBtnTextLabel");

    if (paginationAsyncTrigger && articlesHydrationGrid && asyncLoadingSpinnerIcon && asyncBtnTextLabel) {
        const dynamicPayloadMock = [
            {
                title: "Style begin mr heard by in music tried do layout structures",
                cat: "Fashion", class: "pill-red", gradient: "gradient-1", date: "Jan 09, 2026"
            },
            {
                title: "Why optimization of clean digital channels boosts monetization strategies",
                cat: "Business", class: "pill-green", gradient: "gradient-4", date: "May 18, 2026"
            }
        ];

        paginationAsyncTrigger.addEventListener("click", function() {
            paginationAsyncTrigger.style.pointerEvents = "none";
            asyncLoadingSpinnerIcon.style.display = "inline-block";
            asyncBtnTextLabel.textContent = "Fetching Stream Data...";

            setTimeout(() => {
                dynamicPayloadMock.forEach(item => {
                    const postElementCard = document.createElement("article");
                    postElementCard.className = "premium-article-node";
                    
                    postElementCard.style.opacity = "0";
                    postElementCard.style.transform = "translateY(22px)";
                    postElementCard.style.transition = "all 0.45s cubic-bezier(0.25, 0.8, 0.25, 1)";

                    postElementCard.innerHTML = `
                        <div class="node-media-lens">
                            <div class="node-bg-image-render ${item.gradient}"></div>
                            <span class="category-pill ${item.class}">${item.cat}</span>
                        </div>
                        <div class="node-text-body">
                            <div class="node-meta-row">
                                <span><i class="far fa-user"></i> Sora Blogging</span>
                                <span><i class="far fa-calendar"></i> ${item.date}</span>
                            </div>
                            <h3 class="node-headline"><a href="#">${item.title}</a></h3>
                            <p class="node-summary">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
                        </div>
                    `;

                    articlesHydrationGrid.appendChild(postElementCard);

                    requestAnimationFrame(() => {
                        postElementCard.style.opacity = "1";
                        postElementCard.style.transform = "translateY(0)";
                    });
                });

                asyncLoadingSpinnerIcon.style.display = "none";
                asyncBtnTextLabel.textContent = "All Content Synthesized";
                paginationAsyncTrigger.style.opacity = "0.4";
            }, 1100);
        });
    }

});