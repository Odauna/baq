import mongoose, { Schema } from "mongoose";

const PengumpulanSchema = new mongoose.Schema({
    tanggungan: { type: Number, min: 0},
    fitrah_beras: { type: Number, min: 0},
    fitrah_uang: { type: Number, min: 0},
    mal: { type: Number, min: 0},
    infak: { type: Number, min: 0},
    keterangan: String,
    waktu: String
})

const WargaSchema = new mongoose.Schema({
    rt: { type: String, required: true, enum: ['01','02','03','04','05','06'] },
    keluarga: { type: String, required: true },
    anggota: { type: Number, required: true },
    pengumpulan: { type: PengumpulanSchema },
    // pengumpulan: {
    //     tanggungan: { type: Number, min: 0},
    //     fitrah_beras: { type: Number, min: 0},
    //     fitrah_uang: { type: Number, min: 0},
    //     mal: { type: Number, min: 0},
    //     infak: { type: Number, min: 0},
    //     keterangan: String,
    //     waktu: String
    // },
    mustahik: { type: String, required: true, enum: ['Tidak','Ya'] }
})

export default mongoose.models.Warga || mongoose.model("Warga", WargaSchema);