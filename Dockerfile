# Gunakan Node.js versi 18 yang kompatibel dengan Prisma
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Salin package.json dan yarn.lock untuk cache instalasi dependensi
COPY package*.json yarn.lock ./

# Install dependencies menggunakan yarn
RUN yarn install --frozen-lockfile

# Salin file .env lebih awal agar tersedia saat generate Prisma
COPY .env .env

# Salin file Prisma dan generate client Prisma
COPY prisma ./prisma/
RUN npx prisma generate

# Jalankan migrasi Prisma agar database sesuai dengan skema
RUN npx prisma migrate deploy

# Salin seluruh kode aplikasi
COPY . .

# Expose port untuk aplikasi
EXPOSE 3000

# Perintah untuk menjalankan aplikasi
CMD ["yarn", "start"]
