function login(){
  const user = username.value;
  const pass = password.value;

  if(!user || !pass){
    alert("Lengkapi login!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const cek = users.find(u => u.username === user && u.password === pass);

  if(!cek){
    alert("Username atau password salah!");
    return;
  }

  localStorage.setItem("user", cek.username);
  location.href = "dashboard.html";
}


/* DATA */
const books=[
 {judul:"Pemrograman Web",kat:"Informatika",status:"Tersedia"},
 {judul:"Basis Data",kat:"Informatika",status:"Tersedia"},
 {judul:"Manajemen Proyek",kat:"Manajemen",status:"Dipinjam"},
 {judul:"Algoritma & Struktur Data",kat:"Informatika",status:"Tersedia"}
];

/* KATALOG */
function loadKatalog(){
  const q=(search?.value||"").toLowerCase();
  tbody.innerHTML=books
    .filter(b=>b.judul.toLowerCase().includes(q))
    .map((b,i)=>`
      <tr>
        <td>${i+1}</td>
        <td>${b.judul}</td>
        <td>${b.kat}</td>
        <td>${b.status}</td>
      </tr>`).join("");
}

/* PINJAM */
function pinjam(){
  if(!nama.value||!nim.value||!buku.value||!tanggal.value){
    alert("Lengkapi data");return;
  }
  const r=JSON.parse(localStorage.getItem("riwayat")||"[]");
  r.push({nama:nama.value,nim:nim.value,buku:buku.value,tgl:tanggal.value});
  localStorage.setItem("riwayat",JSON.stringify(r));
  alert("Peminjaman tersimpan");
  formPinjam.reset();
}

/* RIWAYAT */
function loadRiwayat(){
  const r=JSON.parse(localStorage.getItem("riwayat")||"[]");
  tbody.innerHTML=r.map((d,i)=>`
    <tr>
      <td>${i+1}</td>
      <td>${d.nama}</td>
      <td>${d.nim}</td>
      <td>${d.buku}</td>
      <td>${d.tgl}</td>
    </tr>`).join("");
}

/* DENDA */
function hitungDenda(){
  hasil.innerText="Rp "+((hariTerlambat.value||0)*500);
}

/* REGISTER */
function register(){
  const nama = document.getElementById("regNama").value;
  const nim = document.getElementById("regNim").value;
  const user = document.getElementById("regUsername").value;
  const pass = document.getElementById("regPassword").value;

  if(!nama || !nim || !user || !pass){
    alert("Semua data wajib diisi!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const cek = users.find(u => u.username === user);
  if(cek){
    alert("Username sudah terdaftar!");
    return;
  }

  users.push({
    nama:nama,
    nim:nim,
    username:user,
    password:pass
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Pendaftaran berhasil! Silakan login.");
  location.href = "index.html";
}
