import mongoose, { Schema } from "mongoose";

const TimbangSchema = new Schema({
    waktu: { type: String },
    diperbarui: { type: String },
    nominal: { type: Number }
})

export default mongoose.models.Timbang || mongoose.model("Timbang", TimbangSchema)