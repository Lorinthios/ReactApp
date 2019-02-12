export function downloadObjectAsJson(exportObj, exportName) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

export function loadFileAsJson(callback) {
    var file_to_read = document.getElementById("jsonUpload").files[0];
    var fileread = new FileReader();
    fileread.onload = function (e) {
        var content = e.target.result;

        callback(JSON.parse(content));
    };

    if (file_to_read)
        fileread.readAsText(file_to_read);
}