export interface ServiceKecamatan {
  kecamatan: string;
  desaList: string[];
  kelurahanList?: string[]; // Backwards compatibility
}

export const AETRA_SERVICE_AREAS: ServiceKecamatan[] = [
  {
    kecamatan: 'BALARAJA',
    desaList: ['Balaraja', 'Cangkudu', 'Gembong', 'Saga', 'Sentul', 'Sentul Jaya', 'Sukamurni', 'Talagasari', 'Tobat'],
    kelurahanList: ['Balaraja', 'Cangkudu', 'Gembong', 'Saga', 'Sentul', 'Sentul Jaya', 'Sukamurni', 'Talagasari', 'Tobat'],
  },
  {
    kecamatan: 'CIKUPA',
    desaList: ['Bitung Jaya', 'Bojong', 'Budi Mulya', 'Bunder', 'Cibadak', 'Cikupa', 'Dukuh', 'Pasir Gadung', 'Pasir Jaya', 'Sukadamai', 'Sukamulya', 'Sukanagara', 'Talaga', 'Talagasari'],
    kelurahanList: ['Bitung Jaya', 'Bojong', 'Budi Mulya', 'Bunder', 'Cibadak', 'Cikupa', 'Dukuh', 'Pasir Gadung', 'Pasir Jaya', 'Sukadamai', 'Sukamulya', 'Sukanagara', 'Talaga', 'Talagasari'],
  },
  {
    kecamatan: 'CISAUK',
    desaList: ['Cibogo', 'Cisauk', 'Dangdang', 'Mekar Wangi', 'Sampora', 'Suradita'],
    kelurahanList: ['Cibogo', 'Cisauk', 'Dangdang', 'Mekar Wangi', 'Sampora', 'Suradita'],
  },
  {
    kecamatan: 'CISOKA',
    desaList: ['Bojong Loa', 'Carenang', 'Caringin', 'Cempaka', 'Cibugel', 'Cisoka', 'Karangharja', 'Selapajang', 'Sukatani'],
    kelurahanList: ['Bojong Loa', 'Carenang', 'Caringin', 'Cempaka', 'Cibugel', 'Cisoka', 'Karangharja', 'Selapajang', 'Sukatani'],
  },
  {
    kecamatan: 'CURUG',
    desaList: ['Binong', 'Cukanggalih', 'Curug Kulon', 'Curug Wetan', 'Kadu', 'Kadu Jaya'],
    kelurahanList: ['Binong', 'Cukanggalih', 'Curug Kulon', 'Curug Wetan', 'Kadu', 'Kadu Jaya'],
  },
  {
    kecamatan: 'GUNUNG KALER',
    desaList: ['Candeleh', 'Cipaeh', 'Gunung Kaler', 'Kandawati', 'Kedung', 'Onyam', 'Rancagede', 'Sidoko', 'Tamiang'],
    kelurahanList: ['Candeleh', 'Cipaeh', 'Gunung Kaler', 'Kandawati', 'Kedung', 'Onyam', 'Rancagede', 'Sidoko', 'Tamiang'],
  },
  {
    kecamatan: 'JAMBE',
    desaList: ['Ancol Pasir', 'Daru', 'Jambe', 'Kutruk', 'Mekarsari', 'Pasir Barat', 'Ranca Buaya', 'Sukamanah', 'Taban'],
    kelurahanList: ['Ancol Pasir', 'Daru', 'Jambe', 'Kutruk', 'Mekarsari', 'Pasir Barat', 'Ranca Buaya', 'Sukamanah', 'Taban'],
  },
  {
    kecamatan: 'JAYANTI',
    desaList: ['Cikande', 'Dangdeur', 'Jayanti', 'Pabuaran', 'Pangkat', 'Pasir Gintung', 'Pasir Muncang', 'Sumurbandung'],
    kelurahanList: ['Cikande', 'Dangdeur', 'Jayanti', 'Pabuaran', 'Pangkat', 'Pasir Gintung', 'Pasir Muncang', 'Sumurbandung'],
  },
  {
    kecamatan: 'KELAPA DUA',
    desaList: ['Bencongan', 'Bencongan Indah', 'Bojong Nangka', 'Curug Sangereng', 'Kelapa Dua', 'Pakulonan Barat'],
    kelurahanList: ['Bencongan', 'Bencongan Indah', 'Bojong Nangka', 'Curug Sangereng', 'Kelapa Dua', 'Pakulonan Barat'],
  },
  {
    kecamatan: 'KEMIRI',
    desaList: ['Kaleran', 'Karang Anyar', 'Kemiri', 'Klebet', 'Legok Sukamaju', 'Lontar', 'Patramanggala', 'Ranca Labuh'],
    kelurahanList: ['Kaleran', 'Karang Anyar', 'Kemiri', 'Klebet', 'Legok Sukamaju', 'Lontar', 'Patramanggala', 'Ranca Labuh'],
  },
  {
    kecamatan: 'KOSAMBI',
    desaList: ['Belimbing', 'Cengklong', 'Dadap', 'Jatimulya', 'Kosambi Barat', 'Kosambi Timur', 'Rawa Burung', 'Rawa Rengas', 'Salembaran Jati', 'Salembaran Jaya'],
    kelurahanList: ['Belimbing', 'Cengklong', 'Dadap', 'Jatimulya', 'Kosambi Barat', 'Kosambi Timur', 'Rawa Burung', 'Rawa Rengas', 'Salembaran Jati', 'Salembaran Jaya'],
  },
  {
    kecamatan: 'KRESEK',
    desaList: ['Jengkol', 'Kemuning', 'Koper', 'Kresek', 'Pasir Ampo', 'Patrasana', 'Rancailat', 'Renged', 'Talok'],
    kelurahanList: ['Jengkol', 'Kemuning', 'Koper', 'Kresek', 'Pasir Ampo', 'Patrasana', 'Rancailat', 'Renged', 'Talok'],
  },
  {
    kecamatan: 'KRONJO',
    desaList: ['Bakung', 'Cirumpak', 'Kronjo', 'Pagedangan Ilir', 'Pagedangan Udik', 'Pagenjahan', 'Pasilian', 'Pasir'],
    kelurahanList: ['Bakung', 'Cirumpak', 'Kronjo', 'Pagedangan Ilir', 'Pagedangan Udik', 'Pagenjahan', 'Pasilian', 'Pasir'],
  },
  {
    kecamatan: 'LEGOK',
    desaList: ['Babakan', 'Babakan Barat', 'Bojongkamal', 'Caringin', 'Cirarab', 'Kamuning', 'Legok', 'Palasari', 'Rancagong'],
    kelurahanList: ['Babakan', 'Babakan Barat', 'Bojongkamal', 'Caringin', 'Cirarab', 'Kamuning', 'Legok', 'Palasari', 'Rancagong'],
  },
  {
    kecamatan: 'MAUK',
    desaList: ['Banyu Asih', 'Gunung Sari', 'Jatiwaringin', 'Kedung Dalem', 'Ketapang', 'Marga Mulya', 'Mauk Barat', 'Mauk Timur', 'Sasak', 'Tanjung Anom'],
    kelurahanList: ['Banyu Asih', 'Gunung Sari', 'Jatiwaringin', 'Kedung Dalem', 'Ketapang', 'Marga Mulya', 'Mauk Barat', 'Mauk Timur', 'Sasak', 'Tanjung Anom'],
  },
  {
    kecamatan: 'MEKAR BARU',
    desaList: ['Cijeruk', 'Gandaria', 'Jenggot', 'Kedaung', 'Klutuk', 'Kosambi Dalam', 'Mekar Baru', 'Waliwis'],
    kelurahanList: ['Cijeruk', 'Gandaria', 'Jenggot', 'Kedaung', 'Klutuk', 'Kosambi Dalam', 'Mekar Baru', 'Waliwis'],
  },
  {
    kecamatan: 'PAGEDANGAN',
    desaList: ['Cicalengka', 'Cihuni', 'Cijantra', 'Jatake', 'Kadu Sirung', 'Lengkong Kulon', 'Malang Nengah', 'Medang', 'Pagedangan'],
    kelurahanList: ['Cicalengka', 'Cihuni', 'Cijantra', 'Jatake', 'Kadu Sirung', 'Lengkong Kulon', 'Malang Nengah', 'Medang', 'Pagedangan'],
  },
  {
    kecamatan: 'PAKUHAJI',
    desaList: ['Buaran Bambu', 'Buaran Mangga', 'Gaga', 'Kalibaru', 'Kiara Payung', 'Kohod', 'Kramat', 'Laksana', 'Paku Alam', 'Pakuhaji', 'Rawa Boni', 'Sukawali', 'Surya Bahari'],
    kelurahanList: ['Buaran Bambu', 'Buaran Mangga', 'Gaga', 'Kalibaru', 'Kiara Payung', 'Kohod', 'Kramat', 'Laksana', 'Paku Alam', 'Pakuhaji', 'Rawa Boni', 'Sukawali', 'Surya Bahari'],
  },
  {
    kecamatan: 'PANONGAN',
    desaList: ['Ciakar', 'Mekar Bakti', 'Panongan', 'Peusar', 'Ranca Iyuh', 'Ranca Kalapa', 'Serdang Kulon'],
    kelurahanList: ['Ciakar', 'Mekar Bakti', 'Panongan', 'Peusar', 'Ranca Iyuh', 'Ranca Kalapa', 'Serdang Kulon'],
  },
  {
    kecamatan: 'PASAR KEMIS',
    desaList: [
      'Gelam Jaya',
      'Kuta Baru',
      'Kuta Bumi',
      'Kutabumi',
      'Kuta Jaya',
      'Pangadegan',
      'Pasar Kemis',
      'Sindangsari',
      'Suka Asih',
      'Sukaasih',
      'Sukamantri',
    ],
    kelurahanList: [
      'Gelam Jaya',
      'Kuta Baru',
      'Kuta Bumi',
      'Kutabumi',
      'Kuta Jaya',
      'Pangadegan',
      'Pasar Kemis',
      'Sindangsari',
      'Suka Asih',
      'Sukaasih',
      'Sukamantri',
    ],
  },
  {
    kecamatan: 'RAJEG',
    desaList: ['Daon', 'Lembangsari', 'Mekarsari', 'Pangarengan', 'Rajeg', 'Rajeg Mulya', 'Ranca Bango', 'Sukamanah', 'Sukatani', 'Tanjakan', 'Tanjakan Mekar'],
    kelurahanList: ['Daon', 'Lembangsari', 'Mekarsari', 'Pangarengan', 'Rajeg', 'Rajeg Mulya', 'Ranca Bango', 'Sukamanah', 'Sukatani', 'Tanjakan', 'Tanjakan Mekar'],
  },
  {
    kecamatan: 'SEPATAN',
    desaList: ['Karet', 'Kayu Agung', 'Kayu Bongkok', 'Mekar Jaya', 'Pisangan Jaya', 'Pondok Jaya', 'Sarakan', 'Sepatan'],
    kelurahanList: ['Karet', 'Kayu Agung', 'Kayu Bongkok', 'Mekar Jaya', 'Pisangan Jaya', 'Pondok Jaya', 'Sarakan', 'Sepatan'],
  },
  {
    kecamatan: 'SEPATAN TIMUR',
    desaList: ['Gempol Sari', 'Jati Mulya', 'Kampung Kelor', 'Kedaung Barat', 'Lebak Wangi', 'Pondok Kelor', 'Sangiang', 'Tanah Merah'],
    kelurahanList: ['Gempol Sari', 'Jati Mulya', 'Kampung Kelor', 'Kedaung Barat', 'Lebak Wangi', 'Pondok Kelor', 'Sangiang', 'Tanah Merah'],
  },
  {
    kecamatan: 'SINDANG JAYA',
    desaList: ['Badak Anom', 'Sindang Asih', 'Sindang Jaya', 'Sindang Panon', 'Sindang Sono', 'Sukaharja', 'Wanakerta'],
    kelurahanList: ['Badak Anom', 'Sindang Asih', 'Sindang Jaya', 'Sindang Panon', 'Sindang Sono', 'Sukaharja', 'Wanakerta'],
  },
  {
    kecamatan: 'SOLEAR',
    desaList: ['Cikareo', 'Cikasungka', 'Cikuya', 'Munjul', 'Pasanggrahan', 'Solear'],
    kelurahanList: ['Cikareo', 'Cikasungka', 'Cikuya', 'Munjul', 'Pasanggrahan', 'Solear'],
  },
  {
    kecamatan: 'SUKADIRI',
    desaList: ['Buaran Jati', 'Gintung', 'Karang Serang', 'Kosambi', 'Mekar Kondang', 'Pekayon', 'Rawa Kidang', 'Sukadiri'],
    kelurahanList: ['Buaran Jati', 'Gintung', 'Karang Serang', 'Kosambi', 'Mekar Kondang', 'Pekayon', 'Rawa Kidang', 'Sukadiri'],
  },
  {
    kecamatan: 'SUKAMULYA',
    desaList: ['Buniayu', 'Kali Asin', 'Kaliasin', 'Kubang', 'Merak', 'Parahu', 'Sukamulya'],
    kelurahanList: ['Buniayu', 'Kali Asin', 'Kaliasin', 'Kubang', 'Merak', 'Parahu', 'Sukamulya'],
  },
  {
    kecamatan: 'TELUKNAGA',
    desaList: ['Babakan Asem', 'Bojong Renged', 'Kampung Besar', 'Kampung Melayu Barat', 'Kampung Melayu Timur', 'Keboncau', 'Lemo', 'Muara', 'Pangkalan', 'Tanjung Burung', 'Tanjung Pasir', 'Tegal Angus', 'Teluknaga'],
    kelurahanList: ['Babakan Asem', 'Bojong Renged', 'Kampung Besar', 'Kampung Melayu Barat', 'Kampung Melayu Timur', 'Keboncau', 'Lemo', 'Muara', 'Pangkalan', 'Tanjung Burung', 'Tanjung Pasir', 'Tegal Angus', 'Teluknaga'],
  },
  {
    kecamatan: 'TIGARAKSA',
    desaList: ['Bantar Panjang', 'Cileles', 'Cisereh', 'Kadu Agung', 'Margasari', 'Matagara', 'Pasir Bolang', 'Pasir Nangka', 'Pematang', 'Pete', 'Sodong', 'Tapos', 'Tegalsari', 'Tigaraksa'],
    kelurahanList: ['Bantar Panjang', 'Cileles', 'Cisereh', 'Kadu Agung', 'Margasari', 'Matagara', 'Pasir Bolang', 'Pasir Nangka', 'Pematang', 'Pete', 'Sodong', 'Tapos', 'Tegalsari', 'Tigaraksa'],
  },
  {
    kecamatan: 'WANA KERTA',
    desaList: ['Wanakerta', 'Karyamekar', 'Pasir Nangka', 'Tegalsari', 'Sukamulya', 'Suvarna Sutera'],
    kelurahanList: ['Wanakerta', 'Karyamekar', 'Pasir Nangka', 'Tegalsari', 'Sukamulya', 'Suvarna Sutera'],
  },
];

export const KECAMATAN_LIST = AETRA_SERVICE_AREAS.map((a) => a.kecamatan);

// Helper to get flat list of all Desa with Kecamatan info
export const ALL_DESA_FLAT = AETRA_SERVICE_AREAS.flatMap((area) =>
  area.desaList.map((desa) => ({
    desa: desa,
    kecamatan: area.kecamatan,
    displayLabel: `${desa} (Kec. ${area.kecamatan})`,
  }))
);

// Backward compatibility alias
export const ALL_KELURAHAN_FLAT = ALL_DESA_FLAT.map((item) => ({
  kelurahan: item.desa,
  kecamatan: item.kecamatan,
  displayLabel: item.displayLabel,
}));
