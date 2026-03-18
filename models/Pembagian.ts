import mongoose, { Schema } from "mongoose";

const PembagianSchema = new Schema({
    anggota: { type: Number },
    kondisi: { type: String, enum: ["Sama dengan", "Lebih dari sama dengan", "Kurang dari sama dengan"]},
    nominal: { type: Number }
})

export default mongoose.models.Pembagian || mongoose.model("Pembagian", PembagianSchema)