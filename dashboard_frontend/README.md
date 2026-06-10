# ReWorth Dashboard Frontend Static

Folder ini adalah versi frontend-only dari `dashboard_reworth`.
Tujuannya supaya tampilan dashboard bisa di-host di Vercel tanpa PHP.

## Cara Deploy ke Vercel

Set `Root Directory` Vercel ke:

```text
dashboard_frontend
```

Lalu deploy biasa.

## Halaman Utama

- `/`
- `/dashboard.html?role=admin&page=dashboard`
- `/dashboard.html?role=dlh&page=dashboard`
- `/dashboard.html?role=seller&page=dashboard`

## Catatan

- Ini bukan dashboard backend aktif.
- Semua data memakai mock static di `assets/js/dashboard-static.js`.
- CSS utama dicopy dari dashboard PHP agar tampilan sedekat mungkin dengan versi asli.
