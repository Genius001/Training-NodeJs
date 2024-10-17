# Menggunakan Node.js versi terbaru yang kompatibel dengan dependensi
FROM node:18-alpine

# Set working directory di dalam container
WORKDIR /app

# Salin package.json dan yarn.lock terlebih dahulu untuk optimasi cache
COPY package*.json ./
COPY yarn.lock ./

# Instal semua dependensi
RUN yarn install --frozen-lockfile

# Salin semua kode aplikasi setelah dependensi diinstal
COPY . .

# Expose port 3000 agar aplikasi dapat diakses
EXPOSE 3000

# Menjalankan aplikasi saat container mulai
CMD ["yarn", "start"]
