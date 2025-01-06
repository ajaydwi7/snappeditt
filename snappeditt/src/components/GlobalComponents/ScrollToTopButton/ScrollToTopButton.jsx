import React, { useEffect } from "react";

const ScrollToTopButton = () => {
  useEffect(() => {
    const configObj = {
      buttonD: "M8 17.333h5.333v4C13.333 22.806 14.527 24 16 24c1.473 0 2.667-1.194 2.667-2.667v-4H24L16 8l-8 9.333z",
      buttonT: "translate(-1088 -172) translate(832 140) translate(32 32) translate(224)",
      shadowSize: "none",
      roundnessSize: "999px",
      buttonDToBottom: "32px",
      buttonDToRight: "32px",
      selectedBackgroundColor: "#f44336",
      selectedIconColor: "#ffffff",
      buttonWidth: "40px",
      buttonHeight: "40px",
      svgWidth: "32px",
      svgHeight: "32px",
    };

    const createButton = (obj) => {
      const body = document.querySelector("body");
      const backToTopButton = document.createElement("span");
      backToTopButton.classList.add("softr-back-to-top-button");
      backToTopButton.id = "softr-back-to-top-button";
      body.appendChild(backToTopButton);

      backToTopButton.style.width = obj.buttonWidth;
      backToTopButton.style.height = obj.buttonHeight;
      backToTopButton.style.marginRight = obj.buttonDToRight;
      backToTopButton.style.marginBottom = obj.buttonDToBottom;
      backToTopButton.style.borderRadius = obj.roundnessSize;
      backToTopButton.style.boxShadow = obj.shadowSize;
      backToTopButton.style.color = obj.selectedBackgroundColor;
      backToTopButton.style.backgroundColor = obj.selectedBackgroundColor;
      backToTopButton.style.position = "fixed";
      backToTopButton.style.outline = "none";
      backToTopButton.style.bottom = "0px";
      backToTopButton.style.right = "0px";
      backToTopButton.style.cursor = "pointer";
      backToTopButton.style.textAlign = "center";
      backToTopButton.style.border = "solid 2px currentColor";
      backToTopButton.innerHTML = `
        <svg
          class="back-to-top-button-svg inline"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <g fill="none" fill-rule="evenodd">
            <path
              d="M0 0H32V32H0z"
              transform="${obj.buttonT}"
            />
            <path
              class="back-to-top-button-img"
              fill-rule="nonzero"
              d="${obj.buttonD}"
              transform="${obj.buttonT}"
            />
          </g>
        </svg>
      `;

      backToTopButton.style.display = "none";
      window.onscroll = function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          backToTopButton.style.display = "block";
        } else {
          backToTopButton.style.display = "none";
        }
      };

      backToTopButton.onclick = function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      };

      const backToTopButtonImg = backToTopButton.querySelector(".back-to-top-button-img");
      backToTopButtonImg.style.fill = obj.selectedIconColor;
    };

    createButton(configObj);
  }, []);

  return null;
};

export default ScrollToTopButton;
