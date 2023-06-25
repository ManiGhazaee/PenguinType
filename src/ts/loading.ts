document.onreadystatechange = function () {
        if (document.readyState !== "complete" && document.readyState === "interactive") {
                (document.querySelector("body") as HTMLElement)!.style.visibility = "hidden";
                (document.querySelector("#loading") as HTMLElement)!.style.visibility = "visible";
        } else {
                (document.querySelector("#loading") as HTMLElement)!.style.display = "none";
                (document.querySelector("body") as HTMLElement)!.style.visibility = "visible";
        }
};
