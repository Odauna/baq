import mongoose, { Schema } from "mongoose";

const PengumpulanSchema = new Schema({
    // atasnama: { type: Schema.Types.ObjectId, ref: 'Warga' },
    // atasnama: [{ 
    //     w_id: { type: String, required: true },
    //     rt: { type: String, required: true, enum: ['01','02','03','04','05','06'] },
    //     keluarga: { type: String, required: true, unique: true },
    //     anggota: { type: Number, required: true },
    // }],
    tanggungan: { type: Number, min: 0},
    fitrah_beras: { type: Number, min: 0},
    fitrah_uang: { type: Number, min: 0},
    mal: { type: Number, min: 0},
    infak: { type: Number, min: 0},
    keterangan: String,
    waktu: String
})

export default mongoose.models.Pengumpulan || mongoose.model("Pengumpulan", PengumpulanSchema)