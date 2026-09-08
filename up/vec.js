<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>ALLXALL · Light</title>

<style>
  body { background:#000; color:#0f0; font-family:Consolas; padding:20px; }
  h1 { color:#6cf; }
  .opt {
    padding:10px; margin:10px 0; background:#111; border:1px solid #333;
    cursor:pointer;
  }
  .opt:hover { background:#222; }
</style>

<script type="module">

// 6 Optionen (axiomisch)
const OPTIONS = [
  "Sonne",
  "Orbit",
  "DS9",
  "Triangle",
  "Matrix",
  "Engine"
];

// Auswahl speichern
function choose(opt){
    const vec = {
        XI: opt,
        IX: opt,
        x4: opt
    };

    localStorage.setItem("ALLXALL_LIGHT", JSON.stringify(vec));
    alert("Gebucht: " + opt);
}

// Stornieren
function cancel(opt){
    localStorage.removeItem("ALLXALL_LIGHT");
    alert("Storniert: " + opt);
}

</script>

</head>

<body>

<h1>ALLXALL · Light</h1>

<div id="list"></div>

<script>
// Liste erzeugen
OPTIONS.forEach(opt => {
    const div = document.createElement("div");
    div.className = "opt";
    div.innerHTML = `
        <b>${opt}</b><br>
        <button onclick="choose('${opt}')">buchen</button>
        <button onclick="cancel('${opt}')">stornieren</button>
    `;
    document.getElementById("list").appendChild(div);
});
</script>

</body>
</html>
