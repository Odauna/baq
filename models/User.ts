import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  kegiatan: { type: String, enum: ['Kurban','Zakat']},
  level: { type: String, enum: ['Petugas','Distributor','Admin'] },
  nama: { type: String },
  username: { type: String, unique: true },
  password: { type: String, minLength: 8 },
  akses: [String],
  updated_at: { type: String },
  aktif: { type: String, enum: ['Ya','Tidak'] },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
