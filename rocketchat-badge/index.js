/* Custom Script for Logged In Users */

const svgs = {
  itsme: `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 362.75 362.75"><defs><style>.cls-1{fill:#fff;}.cls-2{fill:#ff4612;}</style></defs><path class="cls-1" d="M19.41,260C4.13,244.72-3.8,215.14,1.79,194.27L32.3,80.42C37.89,59.55,59.55,37.89,80.42,32.3L194.27,1.79C215.14-3.8,244.72,4.13,260,19.41l83.34,83.34C358.62,118,366.54,147.61,361,168.48L330.45,282.33c-5.59,20.87-27.25,42.53-48.12,48.12L168.48,361c-20.87,5.59-50.45-2.33-65.73-17.61Z" transform="translate(0)"/><path class="cls-2" d="M222.61,130.62c-10.83-3.7-17.71-5.12-17.22-11.54.38-5,4.17-7.57,11.12-7,5.07.39,8.14,2.49,9.69,5.65a12,12,0,0,0,10.53,6.68c10.1.22,16.25-11.51,9.92-19.39-5.69-7.08-15.05-11.87-28.25-12.88-23.17-1.78-37.77,8.58-39.13,26.22-1.45,18.89,11.25,24,30.47,30.49,13.13,4.23,16.38,6.28,16,11.8-.41,5.35-5.1,8-12.23,7.49-5.94-.46-9.59-2.81-11.31-6.34-1.93-4-6.26-6.21-10.67-6.3h0a11.86,11.86,0,0,0-8.83,3.56l0,0s-5,5.59-14.75,5.59c-7.09-.19-13.37-4-13.37-13.93l.24-33.2a14.23,14.23,0,1,0,7.4-26.34,13.86,13.86,0,0,0-7.24,2.1L155,81.09a7.78,7.78,0,0,0-7.78-7.83H136.66A7.78,7.78,0,0,0,128.88,81l-.46,71.28c-.69,8.87-6.82,12.28-13.68,12.33-7.28,0-13.82-3.81-13.82-13.93l.49-45a5.14,5.14,0,0,0-5.14-5.18H80.46a5.14,5.14,0,0,0-5.14,5.1l-.5,51.36C74.64,178.37,91.51,188,114.74,188c9.72,0,16.39-3.92,21-9.37C141.64,185,150.85,188,162,188s19.49-1.46,27.77-6.16c5.76,3.39,13.1,5.51,22,6.19,24.06,1.85,38.7-9,40.14-27.76C253.17,143.54,240.6,136.83,222.61,130.62Z" transform="translate(0)"/><path class="cls-2" d="M89,89.1A14.23,14.23,0,1,0,74.82,75,14.19,14.19,0,0,0,89,89.1Z" transform="translate(0)"/><path class="cls-2" d="M256.05,193.92c-23.32,0-40.82,13.12-45.64,35.27C209.09,208.44,195.86,196,176.35,196c-13.61,0-22.51,6.11-27.74,14.31C142.67,201.1,132.73,196,120.34,196c-11.5,0-47.81-1.4-47.81,45.25,0,1,0,1.84,0,2.73l0,.06v31.17a12.74,12.74,0,1,0,25.47,0V237.91c0-10.82,6.11-18.14,16.23-18.14,9.25,0,14.65,6.45,14.65,18v37.51a12.74,12.74,0,0,0,25.48,0V234.77c1-9.07,6.63-15,15.7-15,9.77,0,15,6.45,15,18v37.51a12.74,12.74,0,1,0,25.47,0V255.34c5,21.74,22.5,34.76,46.22,34.76,11.15,0,21.73-3.41,29.42-9,.27-.19.52-.38.78-.57s.6-.42.88-.65c0,0,0-.08.06-.11.42-.34.87-.67,1.27-1,7.46-6.82,3.17-19.35-6.85-20.67a12,12,0,0,0-11.43,5l0,0c-2.91,3.8-7.94,5.94-14.82,5.94-11.8,0-18.77-7.33-19.31-18.77H291.9a8.31,8.31,0,0,0,8.31-8.31v-2.06C300.21,211.09,282.69,193.92,256.05,193.92Zm-19.31,39c.71-11.8,8-18.59,19.13-18.59,11.8,0,17.52,7.33,18.06,18.59Z" transform="translate(0)"/></svg>`,
  pexip: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 202.59"><title>Pexip Logo Blue RGB</title><path d="M342.71,486.52a42.21,42.21,0,0,0-35.78,18.88V490H280.81V641.3h26.78V586.77c5.05,8.56,16.46,15.88,35.12,15.88,27.88,0,46.54-23,46.54-57.95C389.25,509.57,370.59,486.52,342.71,486.52Zm-8.78,92.78c-16.24,0-27.66-11.54-27.66-34.82,0-23.07,11.42-34.6,27.66-34.6,15.59,0,27.44,9.06,27.44,34.6C361.37,570.23,349.52,579.3,333.93,579.3Zm435.78-92.78a42.21,42.21,0,0,0-35.78,18.88V490H707.81V641.3h26.78V586.77c5,8.56,16.46,15.88,35.12,15.88,27.88,0,46.54-23,46.54-57.95C816.25,509.57,797.59,486.52,769.71,486.52Zm-8.78,92.78c-16.24,0-27.66-11.54-27.66-34.82,0-23.07,11.42-34.6,27.66-34.6,15.59,0,27.44,9.06,27.44,34.6C788.37,570.23,776.52,579.3,760.93,579.3ZM590.32,543.16l41.27,56.2H599.1l-11-16c-5.93-9-10.32-15.36-14.49-21.29-4.61,6.59-8.78,12.51-14.49,21.07l-11,16.25h-29l40.39-56.64L521.17,490h32.05l9.44,14.27c5.93,8.78,9.44,14,13.39,19.75,4.17-5.71,7.47-10.75,13.61-19.75L599.54,490H629ZM650.69,490h26.56V599.36H650.69Zm29.93-34.68A16.65,16.65,0,1,1,664,438.7,16.67,16.67,0,0,1,680.62,455.36ZM915,449.3v24H888v144h27v24H864v-192ZM460.37,581.58c-14.05,0-25.9-8.13-27-30.3h77.27c3.51-36.22-16-64.54-50.93-64.54-30.29,0-52.9,23.05-52.9,58,0,36.44,21.07,57.95,53.34,57.95,28.76,0,44.13-14.93,51.15-31.83l-24.15-9C483.2,571,476,581.58,460.37,581.58Zm-.66-74.86c13.83,0,23.49,8.78,24.37,24.81H434.25C436.22,515.72,446.54,506.72,459.71,506.72ZM165,641.3v-24h27v-144H165v-24h51v192Z" transform="translate(-165 -438.7)" fill="#fff"/></svg>`,
  badge: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>`,
};

function createVerifiedBadge() {
  const verifiedBadge = document.createElement("div");

  verifiedBadge.classList = ["verify-badge"];
  verifiedBadge.title = "User has been verified";
  verifiedBadge.innerHTML = svgs.badge;

  return verifiedBadge;
}

setInterval(async () => {
  const verifiedUserResponse = await fetch(
    "/api/apps/public/685aee23-54c7-4656-9fac-6ef1e39a1b7d/verify-user"
  );
  const verifiedUsers = new Set(await verifiedUserResponse.json());

  document.querySelectorAll(".rcx-message-header__name").forEach((element) => {
    const username = element.dataset.username;

    if (element.classList.contains("verified")) {
      return;
    }

    if (verifiedUsers.has(username)) {
      element.classList.add("verified");

      const verifiedBadge = createVerifiedBadge();
      element.after(verifiedBadge);
    }
  });
}, 1000);

setInterval(() => {
  document.querySelectorAll(".messages-list .rcx-button").forEach((element) => {
    if (element.classList.contains("styled")) {
      return;
    }

    // Todo: better detection which button it is.
    // Would be nice if we could set something with data attributes
    if (element.href?.includes("itsme")) {
      element.classList.add("styled", "verify-button", "verify-button-itsme");

      element.innerHTML = `
      <div class="verify-button-itsme-logo">${svgs.itsme}</div>
      <div>${element.innerHTML}</div>
      `;
    }

    // Todo: better detection which button it is.
    // Would be nice if we could set something with data attributes
    else if (
      element.href?.includes("pexip") ||
      element.href?.includes("skedify")
    ) {
      element.classList.add("styled", "verify-button", "verify-button-pexip");

      element.innerHTML = `
      <div class="verify-button-pexip-logo">${svgs.pexip}</div>
      <div>${element.innerHTML}</div>
      `;
    }
  });
}, 200);
