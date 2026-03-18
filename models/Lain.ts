import mongoose, { Schema } from "mongoose";

const LainSchema = new Schema({
    keterangan: { type: String },
    jenis: { type: String, enum: ['Rekomendasi','Tambahan']},
    nominal: { type: Number }
})

export default mongoose.models.Lain || mongoose.model("Lain", LainSchema)