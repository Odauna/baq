import mongoose, { Schema } from "mongoose";

const DistribusiSchema = new Schema({
    // warga: [{
    //     w_id: { type: String },
    //     anggota: { type: Number }
    // }],
    // nama: { type: String, required: true },
    atasnama: { type: Map, of: String, required: true },
    alamat: { type: String, required: true },
    area: { type: String, required: true, enum: ['Dusun','Luar Dusun','Amal Usaha','Pengajuan Proposal','Aktivis Masjid','Amil','Pengeluaran Infak'] },
    keterangan: { type: String },
    jenis: { type: String, enum: ['Fitrah (Beras)','Fitrah (Uang)','Mal','Infak'] },
    nominal: { type: Number },
    catatan: { type: String },
    diterima: { type: String, enum: ['Belum','Sudah'] },
    waktu: { type: String }
})

export default mongoose.models.Distribusi || mongoose.model("Distribusi", DistribusiSchema)