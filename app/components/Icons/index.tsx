export default function Icons({
  type,
  id,
  className,
}: {
  type: string;
  id?: string;
  className?: string;
}) {
  return (
    <>
      {/* BRAND - INSTAGRAM */}
      {type === "brand-instagram" && (
        <svg
          id={id}
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clipPath="url(#clip0_14_16)">
            <path
              d="M12 8.4C10.0111 8.4 8.39999 10.0117 8.39999 12C8.39999 13.9888 10.0117 15.6 12 15.6C13.9888 15.6 15.6 13.9883 15.6 12C15.6 10.0112 13.9883 8.4 12 8.4ZM12 6C15.3125 6 18 8.68452 18 12C18 15.3126 15.3155 18 12 18C8.68743 18 5.99999 15.3155 5.99999 12C5.99999 8.68744 8.68451 6 12 6ZM19.8 5.69898C19.8 6.52711 19.127 7.199 18.3 7.199C17.4719 7.199 16.8 6.52608 16.8 5.69898C16.8 4.87188 17.4728 4.2 18.3 4.2C19.126 4.19896 19.8 4.87188 19.8 5.69898ZM12 2.4C9.03062 2.4 8.54663 2.40786 7.16554 2.46936C6.2246 2.51353 5.59385 2.64008 5.00781 2.8676C4.48701 3.06959 4.11133 3.31078 3.71104 3.71106C3.30923 4.11288 3.06847 4.48756 2.8673 5.0086C2.63925 5.59598 2.51274 6.22573 2.46936 7.16538C2.40726 8.49024 2.4 8.95326 2.4 12C2.4 14.9694 2.40786 15.4534 2.46935 16.8343C2.51354 17.7749 2.64026 18.4066 2.86723 18.9912C3.06974 19.5127 3.31142 19.8893 3.70977 20.2877C4.11318 20.6905 4.48897 20.9321 5.00506 21.1313C5.59825 21.3606 6.22859 21.4873 7.16536 21.5306C8.49023 21.5927 8.95325 21.6 12 21.6C14.9694 21.6 15.4534 21.5921 16.8343 21.5306C17.7728 21.4866 18.405 21.3595 18.9912 21.1327C19.5113 20.9308 19.889 20.6882 20.2877 20.2902C20.6911 19.8862 20.9322 19.5113 21.1316 18.994C21.3604 18.403 21.4873 17.7718 21.5306 16.8347C21.5927 15.5098 21.6 15.0467 21.6 12C21.6 9.03062 21.5921 8.54665 21.5306 7.16564C21.4865 6.22687 21.3594 5.59379 21.1324 5.00782C20.9309 4.48846 20.6888 4.11162 20.2889 3.71106C19.8864 3.30858 19.5127 3.06832 18.9913 2.8673C18.4044 2.63945 17.7737 2.51275 16.8346 2.46937C15.5098 2.40726 15.0467 2.4 12 2.4ZM12 0C15.2599 0 15.667 0.0119999 16.947 0.0719999C18.2239 0.131004 19.095 0.333 19.86 0.63C20.6509 0.935004 21.319 1.347 21.9859 2.014C22.6519 2.681 23.064 3.351 23.37 4.14C23.6659 4.904 23.868 5.776 23.928 7.053C23.985 8.333 24 8.74 24 12C24 15.26 23.988 15.667 23.928 16.947C23.869 18.224 23.6659 19.095 23.37 19.86C23.065 20.651 22.6519 21.319 21.9859 21.986C21.319 22.652 20.6479 23.064 19.86 23.37C19.095 23.666 18.2239 23.868 16.947 23.928C15.667 23.985 15.2599 24 12 24C8.73999 24 8.33298 23.988 7.05299 23.928C5.77599 23.869 4.90599 23.666 4.14 23.37C3.34999 23.065 2.68099 22.652 2.01399 21.986C1.347 21.319 0.935999 20.648 0.63 19.86C0.333 19.095 0.132 18.224 0.0720001 16.947C0.0150002 15.667 0 15.26 0 12C0 8.74 0.0120002 8.333 0.0720001 7.053C0.130992 5.775 0.333 4.905 0.63 4.14C0.934991 3.35 1.347 2.681 2.01399 2.014C2.68099 1.347 3.351 0.936 4.14 0.63C4.905 0.333 5.77499 0.132 7.05299 0.0719999C8.33298 0.0149999 8.73999 0 12 0Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_14_16">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}

      {/* BRAND - TIKTOK */}
      {type === "brand-tiktok" && (
        <svg
          id={id}
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M10.72 0V7.69675C10.2332 7.60691 9.73169 7.56 9.22 7.56C4.68022 7.56 1 11.2402 1 15.78C1 20.3198 4.68022 24 9.22 24C13.7597 24 17.44 20.3198 17.44 15.78V11.2963C18.6835 11.8247 20.039 12.12 21.5201 12.12H22.7201V5.4H21.5201C19.2355 5.4 17.44 3.55511 17.44 1.2V0H10.72ZM13.12 2.4H15.1451C15.6177 5.06411 17.6403 7.19528 20.3201 7.69092V9.63384C19.0744 9.45122 17.9499 8.98374 16.9076 8.286L15.04 7.03592V15.78C15.04 18.9943 12.4343 21.6 9.22 21.6C6.0057 21.6 3.4 18.9943 3.4 15.78C3.4 12.5657 6.0057 9.96 9.22 9.96C9.3207 9.96 9.42076 9.96252 9.52013 9.96756V11.8914C9.42107 11.8838 9.32098 11.88 9.22 11.88C7.0661 11.88 5.32 13.6261 5.32 15.78C5.32 17.9339 7.0661 19.68 9.22 19.68C11.3739 19.68 13.12 17.9339 13.12 15.78C13.12 11.3201 13.1186 6.85998 13.12 2.4ZM7.72 15.78C7.72 14.9515 8.39157 14.28 9.22 14.28C10.0484 14.28 10.72 14.9515 10.72 15.78C10.72 16.6085 10.0484 17.28 9.22 17.28C8.39157 17.28 7.72 16.6085 7.72 15.78Z"
            fill="white"
          />
        </svg>
      )}

      {/* BRAND - YOUTUBE */}
      {type === "brand-youtube" && (
        <svg
          id={id}
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="24"
          viewBox="0 0 30 24"
          fill="none"
        >
          <g clipPath="url(#clip0_14_26)">
            <path
              d="M26.4089 4.49223C26.2946 4.04543 25.9713 3.70832 25.6011 3.60432C24.9434 3.42093 21.75 3 15 3C8.25 3 5.05731 3.4211 4.39691 3.60485C4.03017 3.70685 3.70698 4.0439 3.59118 4.49223C3.42798 5.12885 3 7.79393 3 12C3 16.206 3.42798 18.8712 3.59163 19.5096C3.70542 19.9546 4.02867 20.2917 4.39729 20.3952C5.05731 20.5789 8.25 21 15 21C21.75 21 24.9434 20.5791 25.6031 20.3952C25.9698 20.2932 26.2931 19.9561 26.4089 19.5078C26.5721 18.8712 27 16.2 27 12C27 7.8 26.5721 5.12885 26.4089 4.49223ZM29.3148 3.74727C30 6.42 30 12 30 12C30 12 30 17.58 29.3148 20.2527C28.9331 21.731 27.819 22.8927 26.4069 23.2854C23.8442 24 15 24 15 24C15 24 6.16109 24 3.59309 23.2854C2.17572 22.8873 1.06172 21.7254 0.68514 20.2527C2.68221e-07 17.58 0 12 0 12C0 12 2.68221e-07 6.42 0.68514 3.74727C1.06694 2.26909 2.18096 1.10727 3.59309 0.71454C6.16109 -2.23517e-07 15 0 15 0C15 0 23.8442 -2.23517e-07 26.4069 0.71454C27.8243 1.11273 28.9383 2.27454 29.3148 3.74727ZM12 17.25V6.75L21 12L12 17.25Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_14_26">
              <rect width="30" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}

      {/* SEARCH */}
      {type === "search" && (
        <svg
          id={id}
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
            fill="white"
          />
        </svg>
      )}

      {/* CART */}
      {type === "cart" && (
        <svg
          id={id}
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4.00436 6.41686L0.761719 3.17422L2.17593 1.76001L5.41857 5.00265H20.6603C21.2126 5.00265 21.6603 5.45037 21.6603 6.00265C21.6603 6.09997 21.6461 6.19678 21.6182 6.29L19.2182 14.29C19.0913 14.713 18.7019 15.0027 18.2603 15.0027H6.00436V17.0027H17.0044V19.0027H5.00436C4.45207 19.0027 4.00436 18.5549 4.00436 18.0027V6.41686ZM6.00436 7.00265V13.0027H17.5163L19.3163 7.00265H6.00436ZM5.50436 23.0027C4.67593 23.0027 4.00436 22.3311 4.00436 21.5027C4.00436 20.6742 4.67593 20.0027 5.50436 20.0027C6.33279 20.0027 7.00436 20.6742 7.00436 21.5027C7.00436 22.3311 6.33279 23.0027 5.50436 23.0027ZM17.5044 23.0027C16.6759 23.0027 16.0044 22.3311 16.0044 21.5027C16.0044 20.6742 16.6759 20.0027 17.5044 20.0027C18.3328 20.0027 19.0044 20.6742 19.0044 21.5027C19.0044 22.3311 18.3328 23.0027 17.5044 23.0027Z"
            fill="white"
          />
        </svg>
      )}

      {/* SHOPPING BAG */}
      {type === "shopping-bag" && (
        <svg
          id={id}
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M7.35352 2.41711H18.3535C18.6682 2.41711 18.9646 2.5653 19.1535 2.81711L21.8535 6.41711V21.4171C21.8535 21.9694 21.4058 22.4171 20.8535 22.4171H4.85352C4.30124 22.4171 3.85352 21.9694 3.85352 21.4171V6.41711L6.55352 2.81711C6.74238 2.5653 7.03877 2.41711 7.35352 2.41711ZM19.8535 8.41711H5.85352V20.4171H19.8535V8.41711ZM19.3535 6.41711L17.8535 4.41711H7.85352L6.35352 6.41711H19.3535ZM9.85352 10.4171V12.4171C9.85352 14.074 11.1966 15.4171 12.8535 15.4171C14.5103 15.4171 15.8535 14.074 15.8535 12.4171V10.4171H17.8535V12.4171C17.8535 15.1785 15.6149 17.4171 12.8535 17.4171C10.0921 17.4171 7.85352 15.1785 7.85352 12.4171V10.4171H9.85352Z"
            fill="white"
          />
        </svg>
      )}

      {/* STORE */}
      {type === "store" && (
        <svg
          id={id}
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clipPath="url(#clip0_48_52)">
            <path
              d="M24.3333 13.3333V22.6667C24.3333 23.4031 23.7364 24 23 24H1.66667C0.930293 24 0.333333 23.4031 0.333333 22.6667V13.3333H-1V10.6667L0.333333 4H24.3333L25.6667 10.6667V13.3333H24.3333ZM3 13.3333V21.3333H21.6667V13.3333H3ZM1.71948 10.6667H22.9472L22.1472 6.66667H2.51948L1.71948 10.6667ZM4.33333 14.6667H15V18.6667H4.33333V14.6667ZM0.333333 0H24.3333V2.66667H0.333333V0Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_48_52">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}

      {/* COMMUNITY */}
      {type === "community" && (
        <svg
          id={id}
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clipPath="url(#clip0_48_54)">
            <path
              d="M12 10.8C15.3137 10.8 18 13.4863 18 16.8V24H15.6V16.8C15.6 14.8828 14.1013 13.3156 12.2116 13.2061L12 13.2C10.0828 13.2 8.51561 14.6987 8.40611 16.5884L8.4 16.8V24H6V16.8C6 13.4863 8.6863 10.8 12 10.8ZM4.2 14.4C4.53462 14.4 4.86011 14.4391 5.17212 14.513C4.97042 15.1128 4.84648 15.7464 4.81075 16.4032L4.8 16.8L4.80084 16.9027C4.66508 16.8547 4.52185 16.8224 4.37335 16.8083L4.2 16.8C3.26436 16.8 2.49546 17.5139 2.40824 18.4266L2.4 18.6V24H0V18.6C0 16.2804 1.8804 14.4 4.2 14.4ZM19.8 14.4C22.1196 14.4 24 16.2804 24 18.6V24H21.6V18.6C21.6 17.6644 20.8861 16.8955 19.9734 16.8083L19.8 16.8C19.5898 16.8 19.3879 16.836 19.2004 16.9022L19.2 16.8C19.2 16.0012 19.0699 15.2328 18.8298 14.5147C19.1399 14.4391 19.4653 14.4 19.8 14.4ZM4.2 7.2C5.85685 7.2 7.2 8.54315 7.2 10.2C7.2 11.8568 5.85685 13.2 4.2 13.2C2.54315 13.2 1.2 11.8568 1.2 10.2C1.2 8.54315 2.54315 7.2 4.2 7.2ZM19.8 7.2C21.4568 7.2 22.8 8.54315 22.8 10.2C22.8 11.8568 21.4568 13.2 19.8 13.2C18.1432 13.2 16.8 11.8568 16.8 10.2C16.8 8.54315 18.1432 7.2 19.8 7.2ZM4.2 9.6C3.86863 9.6 3.6 9.86868 3.6 10.2C3.6 10.5313 3.86863 10.8 4.2 10.8C4.53137 10.8 4.8 10.5313 4.8 10.2C4.8 9.86868 4.53137 9.6 4.2 9.6ZM19.8 9.6C19.4687 9.6 19.2 9.86868 19.2 10.2C19.2 10.5313 19.4687 10.8 19.8 10.8C20.1313 10.8 20.4 10.5313 20.4 10.2C20.4 9.86868 20.1313 9.6 19.8 9.6ZM12 0C14.6509 0 16.8 2.14903 16.8 4.8C16.8 7.45097 14.6509 9.6 12 9.6C9.34903 9.6 7.2 7.45097 7.2 4.8C7.2 2.14903 9.34903 0 12 0ZM12 2.4C10.6745 2.4 9.6 3.47452 9.6 4.8C9.6 6.12548 10.6745 7.2 12 7.2C13.3255 7.2 14.4 6.12548 14.4 4.8C14.4 3.47452 13.3255 2.4 12 2.4Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_48_54">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}

      {/* PODCAST */}
      {type === "podcast" && (
        <svg
          id={id}
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clipPath="url(#clip0_48_60)">
            <path
              d="M17.1107 17.4375C19.7089 15.9703 21.4286 13.4109 21.4286 10.5C21.4286 5.94375 17.2071 2.25 12 2.25C6.79286 2.25 2.57143 5.94375 2.57143 10.5C2.57143 13.4109 4.29107 15.9656 6.88929 17.4375C6.95357 18.2484 7.10357 19.2188 7.275 20.1141L7.28571 20.1609C3 18.5531 0 14.8359 0 10.5C0 4.70156 5.37321 0 12 0C18.6268 0 24 4.70156 24 10.5C24 14.8359 21 18.5578 16.7143 20.1609L16.725 20.1094C16.8911 19.2094 17.0464 18.2438 17.1107 17.4375ZM16.9875 15.6516C16.9018 15.3844 16.7786 15.1313 16.6125 14.8922C16.3018 14.4375 15.8893 14.0953 15.4393 13.8422C16.4839 13.0172 17.1429 11.8266 17.1429 10.5C17.1429 8.01562 14.8393 6 12 6C9.16071 6 6.85714 8.01562 6.85714 10.5C6.85714 11.8266 7.51607 13.0219 8.56071 13.8422C8.11071 14.0953 7.69821 14.4375 7.3875 14.8922C7.22143 15.1313 7.09821 15.3844 7.0125 15.6516C5.34643 14.4141 4.28571 12.5625 4.28571 10.5C4.28571 6.77344 7.74107 3.75 12 3.75C16.2589 3.75 19.7143 6.77344 19.7143 10.5C19.7143 12.5625 18.6536 14.4141 16.9875 15.6516ZM12 14.625C13.7625 14.625 15.4286 15.0281 15.4286 16.6781C15.4286 18.225 14.7375 21.5578 14.325 22.9078C14.0518 23.7984 13.0125 24.0047 12 24.0047C10.9875 24.0047 9.95357 23.7984 9.675 22.9078C9.25714 21.5719 8.57143 18.2344 8.57143 16.6828C8.57143 15.0375 10.2375 14.6297 12 14.6297V14.625ZM12 7.875C12.7956 7.875 13.5587 8.15156 14.1213 8.64384C14.6839 9.13613 15 9.80381 15 10.5C15 11.1962 14.6839 11.8639 14.1213 12.3562C13.5587 12.8484 12.7956 13.125 12 13.125C11.2044 13.125 10.4413 12.8484 9.87868 12.3562C9.31607 11.8639 9 11.1962 9 10.5C9 9.80381 9.31607 9.13613 9.87868 8.64384C10.4413 8.15156 11.2044 7.875 12 7.875Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_48_60">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
    </>
  );
}
