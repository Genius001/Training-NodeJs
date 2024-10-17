# Gunakan Node.js versi 18 yang kompatibel dengan Prisma
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Salin package.json dan yarn.lock untuk cache instalasi dependensi
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies menggunakan yarn
RUN yarn install --frozen-lockfile

# Salin file Prisma dan generate client Prisma
COPY prisma ./prisma/
RUN npx prisma generate

# Salin file .env
COPY .env .env

# Jalankan migrasi Prisma agar database sesuai dengan skema
RUN npx prisma migrate deploy

# Salin seluruh kode aplikasi
COPY . .

# Expose port untuk aplikasi
EXPOSE 3000

# Perintah untuk menjalankan aplikasi
CMD ["yarn", "start"]
