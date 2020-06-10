(function () {
    const linkFamily = document.querySelector(".family-flow-link")
    const linkDate = document.querySelector(".date-flow-link")
    const linkGroup = document.querySelector(".group-flow-link")
    const linkOnly = document.querySelector(".only-flow-link")
    if (linkFamily) {
        linkFamily.href = "/tweede-stap?groupChoice=family&javascript=1";
        linkDate.href = "/tweede-stap?groupChoice=date&javascript=1";
        linkGroup.href = "/tweede-stap?groupChoice=small-group&javascript=1";
        linkOnly.href = "/tweede-stap?groupChoice=only&javascript=1";

    }
})();