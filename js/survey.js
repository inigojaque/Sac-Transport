function SaveTheData() {
    const downloadToFile = (content, filename, contentType) => {
        const a = document.createElement('a');
        const file = new Blob([content], {
            type: contentType
        });

        a.href = URL.createObjectURL(file);
        a.download = filename;
        a.click();

        URL.revokeObjectURL(a.href);
    };

    var dataToSave = "";
    dataToSave += "Name: " + document.getElementById("userName").value + "\r\n";
    dataToSave += "Email: " + document.getElementById("userEmail").value + "\r\n";

    var e = document.getElementById("userTMode");
    var userTMode = e.value;
    dataToSave += "Desired Transport Mode: " + userTMode + "\r\n";




    if (document.getElementById('userYesRadio').checked) {
        dataToSave += "Decision Altered: " + "Yes" + "\r\n";
    } else {
        dataToSave += "Decision Altered: " + "No" + "\r\n";
    }

    dataToSave += "User Feedback: " + document.getElementById("userMessage").value + "\r\n";

    downloadToFile(dataToSave, 'user-survey.txt', 'text/plain');
}