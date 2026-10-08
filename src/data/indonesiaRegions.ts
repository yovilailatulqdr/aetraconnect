// Database Wilayah Indonesia Lengkap
// Dilengkapi Kabupaten/Kota, Kecamatan, Kelurahan/Desa, dan Kode Pos

export interface DistrictData {
  name: string;
  postalCode?: string;
  villages: string[];
}

export interface CityData {
  name: string;
  districts: DistrictData[];
}

export interface ProvinceData {
  id: string;
  name: string;
  cities: CityData[];
}

// Khusus Wilayah Layanan Pemasangan Sambungan Baru Aetra di Kabupaten Tangerang
export interface AetraInstallationKecamatan {
  name: string;
  postalCode: string;
  villages: string[];
}

export const AETRA_TANGERANG_INSTALLATION_REGIONS: AetraInstallationKecamatan[] = [
  {
    name: 'BALARAJA',
    postalCode: '15610',
    villages: ['Balaraja', 'Cangkudu', 'Gembong', 'Saga', 'Sentul', 'Sentul Jaya', 'Sukamurni', 'Talagasari', 'Tobat'],
  },
  {
    name: 'CIKUPA',
    postalCode: '15710',
    villages: ['Bitung Jaya', 'Bojong', 'Budi Mulya', 'Bunder', 'Cibadak', 'Cikupa', 'Dukuh', 'Pasir Gadung', 'Pasir Jaya', 'Sukadamai', 'Sukamulya', 'Sukanagara', 'Talaga', 'Talagasari'],
  },
  {
    name: 'CISAUK',
    postalCode: '15341',
    villages: ['Cibogo', 'Cisauk', 'Dangdang', 'Mekar Wangi', 'Sampora', 'Suradita'],
  },
  {
    name: 'CISOKA',
    postalCode: '15730',
    villages: ['Bojong Loa', 'Carenang', 'Caringin', 'Cempaka', 'Cibugel', 'Cisoka', 'Karangharja', 'Selapajang', 'Sukatani'],
  },
  {
    name: 'CURUG',
    postalCode: '15810',
    villages: ['Binong', 'Cukanggalih', 'Curug Kulon', 'Curug Wetan', 'Kadu', 'Kadu Jaya'],
  },
  {
    name: 'GUNUNG KALER',
    postalCode: '15620',
    villages: ['Candeleh', 'Cipaeh', 'Gunung Kaler', 'Kandawati', 'Kedung', 'Onyam', 'Rancagede', 'Sidoko', 'Tamiang'],
  },
  {
    name: 'JAMBE',
    postalCode: '15720',
    villages: ['Ancol Pasir', 'Daru', 'Jambe', 'Kutruk', 'Mekarsari', 'Pasir Barat', 'Ranca Buaya', 'Sukamanah', 'Taban'],
  },
  {
    name: 'JAYANTI',
    postalCode: '15610',
    villages: ['Cikande', 'Dangdeur', 'Jayanti', 'Pabuaran', 'Pangkat', 'Pasir Gintung', 'Pasir Muncang', 'Sumurbandung'],
  },
  {
    name: 'KELAPA DUA',
    postalCode: '15810',
    villages: ['Bencongan', 'Bencongan Indah', 'Bojong Nangka', 'Curug Sangereng', 'Kelapa Dua', 'Pakulonan Barat'],
  },
  {
    name: 'KEMIRI',
    postalCode: '15530',
    villages: ['Kaleran', 'Karang Anyar', 'Kemiri', 'Klebet', 'Legok Sukamaju', 'Lontar', 'Patramanggala', 'Ranca Labuh'],
  },
  {
    name: 'KOSAMBI',
    postalCode: '15211',
    villages: ['Belimbing', 'Cengklong', 'Dadap', 'Jatimulya', 'Kosambi Barat', 'Kosambi Timur', 'Rawa Burung', 'Rawa Rengas', 'Salembaran Jati', 'Salembaran Jaya'],
  },
  {
    name: 'KRESEK',
    postalCode: '15620',
    villages: ['Jengkol', 'Kemuning', 'Koper', 'Kresek', 'Pasir Ampo', 'Patrasana', 'Rancailat', 'Renged', 'Talok'],
  },
  {
    name: 'KRONJO',
    postalCode: '15550',
    villages: ['Bakung', 'Cirumpak', 'Kronjo', 'Pagedangan Ilir', 'Pagedangan Udik', 'Pagenjahan', 'Pasilian', 'Pasir'],
  },
  {
    name: 'LEGOK',
    postalCode: '15820',
    villages: ['Babakan', 'Babakan Barat', 'Bojongkamal', 'Caringin', 'Cirarab', 'Kamuning', 'Legok', 'Palasari', 'Rancagong'],
  },
  {
    name: 'MAUK',
    postalCode: '15530',
    villages: ['Banyu Asih', 'Gunung Sari', 'Jatiwaringin', 'Kedung Dalem', 'Ketapang', 'Marga Mulya', 'Mauk Barat', 'Mauk Timur', 'Sasak', 'Tanjung Anom'],
  },
  {
    name: 'MEKAR BARU',
    postalCode: '15550',
    villages: ['Cijeruk', 'Gandaria', 'Jenggot', 'Kedaung', 'Klutuk', 'Kosambi Dalam', 'Mekar Baru', 'Waliwis'],
  },
  {
    name: 'PAGEDANGAN',
    postalCode: '15339',
    villages: ['Cicalengka', 'Cihuni', 'Cijantra', 'Jatake', 'Kadu Sirung', 'Lengkong Kulon', 'Malang Nengah', 'Medang', 'Pagedangan'],
  },
  {
    name: 'PAKUHAJI',
    postalCode: '15570',
    villages: ['Buaran Bambu', 'Buaran Mangga', 'Gaga', 'Kalibaru', 'Kiara Payung', 'Kohod', 'Kramat', 'Laksana', 'Paku Alam', 'Pakuhaji', 'Rawa Boni', 'Sukawali', 'Surya Bahari'],
  },
  {
    name: 'PANONGAN',
    postalCode: '15711',
    villages: ['Ciakar', 'Mekar Bakti', 'Panongan', 'Peusar', 'Ranca Iyuh', 'Ranca Kalapa', 'Serdang Kulon'],
  },
  {
    name: 'PASAR KEMIS',
    postalCode: '15560',
    villages: [
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
    name: 'RAJEG',
    postalCode: '15540',
    villages: ['Daon', 'Lembangsari', 'Mekarsari', 'Pangarengan', 'Rajeg', 'Rajeg Mulya', 'Ranca Bango', 'Sukamanah', 'Sukatani', 'Tanjakan', 'Tanjakan Mekar'],
  },
  {
    name: 'SEPATAN',
    postalCode: '15520',
    villages: ['Karet', 'Kayu Agung', 'Kayu Bongkok', 'Mekar Jaya', 'Pisangan Jaya', 'Pondok Jaya', 'Sarakan', 'Sepatan'],
  },
  {
    name: 'SEPATAN TIMUR',
    postalCode: '15520',
    villages: ['Gempol Sari', 'Jatimulya', 'Kampung Kelor', 'Kedaung Barat', 'Lebak Wangi', 'Pondok Kelor', 'Sangiang', 'Tanah Merah'],
  },
  {
    name: 'SINDANG JAYA',
    postalCode: '15560',
    villages: ['Badak Anom', 'Sindang Asih', 'Sindang Jaya', 'Sindang Panon', 'Sindang Sono', 'Sukaharja', 'Wanakerta'],
  },
  {
    name: 'SOLEAR',
    postalCode: '15730',
    villages: ['Cikareo', 'Cikasungka', 'Cikuya', 'Munjul', 'Pasanggrahan', 'Solear'],
  },
  {
    name: 'SUKADIRI',
    postalCode: '15530',
    villages: ['Buaran Jati', 'Gintung', 'Karang Serang', 'Kosambi', 'Mekar Kondang', 'Pekayon', 'Rawa Kidang', 'Sukadiri'],
  },
  {
    name: 'SUKAMULYA',
    postalCode: '15610',
    villages: ['Buniayu', 'Kali Asin', 'Kaliasin', 'Kubang', 'Merak', 'Parahu', 'Sukamulya'],
  },
  {
    name: 'TELUKNAGA',
    postalCode: '15510',
    villages: ['Babakan Asem', 'Bojong Renged', 'Kampung Besar', 'Kampung Melayu Barat', 'Kampung Melayu Timur', 'Keboncau', 'Lemo', 'Muara', 'Pangkalan', 'Tanjung Burung', 'Tanjung Pasir', 'Tegal Angus', 'Teluknaga'],
  },
  {
    name: 'TIGARAKSA',
    postalCode: '15720',
    villages: ['Bantar Panjang', 'Cileles', 'Cisereh', 'Kadu Agung', 'Margasari', 'Matagara', 'Pasir Bolang', 'Pasir Nangka', 'Pematang', 'Pete', 'Sodong', 'Tapos', 'Tegalsari', 'Tigaraksa'],
  },
  {
    name: 'WANA KERTA',
    postalCode: '15560',
    villages: ['Karyamekar', 'Pasir Barat', 'Pasir Nangka', 'Sindang Asih', 'Sindang Jaya', 'Sukamulya', 'Suvarna Sutera', 'Tegalsari', 'Wanakerta'],
  },
];

export const INDONESIA_PROVINCES_DATA: ProvinceData[] = [
  {
    "id": "banten",
    "name": "Banten",
    "cities": [
      {
        "name": "Kabupaten Tangerang",
        "districts": [
          {
            "name": "Balaraja",
            "postalCode": "15610",
            "villages": [
              "Balaraja",
              "Talagasari",
              "Tobat",
              "Saga",
              "Sentul",
              "Gembong",
              "Cangkudu",
              "Sukamurni"
            ]
          },
          {
            "name": "Cikupa",
            "postalCode": "15710",
            "villages": [
              "Cikupa",
              "Budi Mulya",
              "Bojong",
              "Sukamulya",
              "Dukuh",
              "Bitung Jaya",
              "Talaga",
              "Pasir Gadung",
              "Sukamantri",
              "Cibadak"
            ]
          },
          {
            "name": "Curug",
            "postalCode": "15810",
            "villages": [
              "Curug Kulon",
              "Curug Wetan",
              "Kadu Jaya",
              "Kadu",
              "Cukanggalih",
              "Binong"
            ]
          },
          {
            "name": "Jayanti",
            "postalCode": "15610",
            "villages": [
              "Jayanti",
              "Sumur Bandung",
              "Pasir Gintung",
              "Pabuaran",
              "Dangdeur",
              "Cikande",
              "Pasir Muncang"
            ]
          },
          {
            "name": "Pasar Kemis",
            "postalCode": "15560",
            "villages": [
              "Pasar Kemis",
              "Kuta Bumi",
              "Kutabumi",
              "Kuta Baru",
              "Kuta Jaya",
              "Gelam Jaya",
              "Sindangsari",
              "Pangadegan",
              "Sukamantri",
              "Suka Asih",
              "Sukaasih"
            ]
          },
          {
            "name": "Sepatan",
            "postalCode": "15520",
            "villages": [
              "Sepatan",
              "Pisangan Jaya",
              "Kayu Agung",
              "Kayu Bongkok",
              "Sarakan",
              "Karet"
            ]
          },
          {
            "name": "Sepatan Timur",
            "postalCode": "15520",
            "villages": [
              "Kedaung Barat",
              "Lebak Wangi",
              "Tanah Merah",
              "Gempol Sari",
              "Jatimulya",
              "Pondok Kelor",
              "Kampung Kelor"
            ]
          },
          {
            "name": "Sindang Jaya",
            "postalCode": "15560",
            "villages": [
              "Sindang Jaya",
              "Sindang Asih",
              "Sindang Sono",
              "Wanakerta",
              "Badak Anom",
              "Sindang Panon"
            ]
          },
          {
            "name": "Rajeg",
            "postalCode": "15540",
            "villages": [
              "Rajeg",
              "Ranca Bango",
              "Sukatani",
              "Daon",
              "Pangarengan",
              "Tanjakan",
              "Mekarsari",
              "Tanjakan Mekar"
            ]
          },
          {
            "name": "Panongan",
            "postalCode": "15711",
            "villages": [
              "Panongan",
              "Mekar Bakti",
              "Ciakar",
              "Ranca Iyuh",
              "Peusar",
              "Serdang Kulon"
            ]
          },
          {
            "name": "Kelapa Dua",
            "postalCode": "15810",
            "villages": [
              "Kelapa Dua",
              "Bencongan",
              "Bencongan Indah",
              "Bojong Nangka",
              "Curug Sangereng",
              "Pakulonan Barat"
            ]
          },
          {
            "name": "Legok",
            "postalCode": "15820",
            "villages": [
              "Legok",
              "Babakan Barat",
              "Babakan",
              "Bojongkamal",
              "Cirarab",
              "Palasari",
              "Caringin"
            ]
          },
          {
            "name": "Tigaraksa",
            "postalCode": "15720",
            "villages": [
              "Tigaraksa",
              "Kadu Agung",
              "Matagara",
              "Pasir Bolang",
              "Pasir Nangka",
              "Sodong",
              "Bantar Panjang",
              "Pete"
            ]
          },
          {
            "name": "Cisauk",
            "postalCode": "15341",
            "villages": [
              "Cisauk",
              "Sampora",
              "Cibogo",
              "Suradita",
              "Dangdang",
              "Mekar Wangi"
            ]
          },
          {
            "name": "Pakuhaji",
            "postalCode": "15570",
            "villages": [
              "Pakuhaji",
              "Buaran Bambu",
              "Buaran Mangga",
              "Gaga",
              "Kalibaru",
              "Kiara Payung",
              "Kohod",
              "Kramat",
              "Laksana",
              "Paku Alam",
              "Rawa Boni",
              "Sukawali",
              "Surya Bahari"
            ]
          },
          {
            "name": "Teluknaga",
            "postalCode": "15510",
            "villages": [
              "Babakan Asem",
              "Bojong Renged",
              "Kampung Besar",
              "Kampung Melayu Barat",
              "Kampung Melayu Timur",
              "Keboncau",
              "Lemo",
              "Muara",
              "Pangkalan",
              "Tanjung Burung",
              "Tanjung Pasir",
              "Tegal Angus",
              "Teluknaga"
            ]
          },
          {
            "name": "Kosambi",
            "postalCode": "15211",
            "villages": [
              "Belimbing",
              "Cengklong",
              "Dadap",
              "Jatimulya",
              "Kosambi Barat",
              "Kosambi Timur",
              "Rawa Burung",
              "Rawa Rengas",
              "Salembaran Jaya",
              "Salembaran Jati"
            ]
          },
          {
            "name": "Kresek",
            "postalCode": "15620",
            "villages": [
              "Kresek",
              "Jengkol",
              "Kemuning",
              "Koper",
              "Pasir Ampo",
              "Patrasana",
              "Rancailat",
              "Renged",
              "Talok"
            ]
          },
          {
            "name": "Kronjo",
            "postalCode": "15550",
            "villages": [
              "Kronjo",
              "Bakung",
              "Cirumpak",
              "Pagedangan Ilir",
              "Pagedangan Udik",
              "Pasilian",
              "Pasir",
              "Pagenjahan"
            ]
          },
          {
            "name": "Mauk",
            "postalCode": "15530",
            "villages": [
              "Mauk Barat",
              "Mauk Timur",
              "Banyu Asih",
              "Gunung Sari",
              "Jatiwaringin",
              "Kedung Dalem",
              "Ketapang",
              "Marga Mulya",
              "Sasak",
              "Tanjung Anom"
            ]
          },
          {
            "name": "Kemiri",
            "postalCode": "15530",
            "villages": [
              "Kemiri",
              "Karang Anyar",
              "Kaleran",
              "Klebet",
              "Lontar",
              "Patramanggala",
              "Ranca Labuh"
            ]
          },
          {
            "name": "Sukadiri",
            "postalCode": "15530",
            "villages": [
              "Sukadiri",
              "Buaran Jati",
              "Gintung",
              "Karang Serang",
              "Kosambi",
              "Mekar Kondang",
              "Pekayon",
              "Rawa Kidang"
            ]
          },
          {
            "name": "Gunung Kaler",
            "postalCode": "15620",
            "villages": [
              "Gunung Kaler",
              "Candeleh",
              "Cipaeh",
              "Ganda Ria",
              "Kedung",
              "Onyam",
              "Rancagede",
              "Sidoko",
              "Tamiang"
            ]
          },
          {
            "name": "Mekar Baru",
            "postalCode": "15550",
            "villages": [
              "Mekar Baru",
              "Cijeruk",
              "Gandaria",
              "Jenggot",
              "Kedaung",
              "Kluit",
              "Kosambi Dalam",
              "Waliwis"
            ]
          },
          {
            "name": "Pagedangan",
            "postalCode": "15339",
            "villages": [
              "Pagedangan",
              "Cicalengka",
              "Cihuni",
              "Cijantra",
              "Jatake",
              "Kadu Sirung",
              "Lengkona Kulon",
              "Malang Nengah",
              "Medang"
            ]
          },
          {
            "name": "Solear",
            "postalCode": "15730",
            "villages": [
              "Solear",
              "Cikareo",
              "Cikuya",
              "Cikasungka",
              "Munjul",
              "Pasanggrahan",
              "Tiregarang"
            ]
          },
          {
            "name": "Sukamulya",
            "postalCode": "15610",
            "villages": [
              "Sukamulya",
              "Buniayu",
              "Kaliasin",
              "Kubang",
              "Merak",
              "Parahu"
            ]
          },
          {
            "name": "Cisoka",
            "postalCode": "15730",
            "villages": [
              "Cisoka",
              "Bojong Loa",
              "Carenang",
              "Caringin",
              "Cempaka",
              "Karangharja",
              "Sukatani"
            ]
          }
        ]
      },
      {
        "name": "Kota Tangerang",
        "districts": [
          {
            "name": "Tangerang",
            "postalCode": "15111",
            "villages": [
              "Sukarasa",
              "Sukasari",
              "Babakan",
              "Buaran Indah",
              "Cikokol",
              "Kelapa Indah",
              "Tanah Tinggi"
            ]
          },
          {
            "name": "Karawaci",
            "postalCode": "15115",
            "villages": [
              "Karawaci",
              "Karawaci Baru",
              "Cimone",
              "Cimone Jaya",
              "Pabuaran",
              "Pabuaran Tumpeng",
              "Pasir Jaya",
              "Margasari",
              "Bojong Jaya",
              "Koang Jaya"
            ]
          },
          {
            "name": "Cibodas",
            "postalCode": "15138",
            "villages": [
              "Cibodas",
              "Cibodasari",
              "Cibodas Baru",
              "Uwung Jaya",
              "Jatiuwung",
              "Panunggangan Barat"
            ]
          },
          {
            "name": "Jatiuwung",
            "postalCode": "15134",
            "villages": [
              "Alam Jaya",
              "Gandasari",
              "Jatake",
              "Keroncong",
              "Manis Jaya",
              "Pasir Jaya"
            ]
          },
          {
            "name": "Periuk",
            "postalCode": "15131",
            "villages": [
              "Periuk",
              "Periuk Jaya",
              "Gebang Raya",
              "Gemasari",
              "Sangirang"
            ]
          },
          {
            "name": "Cipondoh",
            "postalCode": "15148",
            "villages": [
              "Cipondoh",
              "Cipondoh Indah",
              "Cipondoh Makmur",
              "Gondrong",
              "Kenanga",
              "Petir",
              "Poris Plawad",
              "Poris Plawad Indah",
              "Poris Plawad Utara"
            ]
          },
          {
            "name": "Pinang",
            "postalCode": "15145",
            "villages": [
              "Pinang",
              "Cipete",
              "Kunciran",
              "Kunciran Indah",
              "Kunciran Jaya",
              "Nerogtog",
              "Pakujan",
              "Panunggangan",
              "Panunggangan Timur",
              "Panunggangan Utara",
              "Sudimara Pinang"
            ]
          },
          {
            "name": "Ciledug",
            "postalCode": "15153",
            "villages": [
              "Sudimara Barat",
              "Sudimara Jaya",
              "Sudimara Selatan",
              "Sudimara Timur",
              "Tajur",
              "Paninggilan",
              "Paninggilan Utara",
              "Parung Serab"
            ]
          },
          {
            "name": "Karang Tengah",
            "postalCode": "15157",
            "villages": [
              "Karang Tengah",
              "Karang Mulya",
              "Karang Timur",
              "Parung Jaya",
              "Pedurenan",
              "Pondok Bahar",
              "Pondok Pucung"
            ]
          },
          {
            "name": "Larangan",
            "postalCode": "15154",
            "villages": [
              "Cipadu",
              "Cipadu Jaya",
              "Gaga",
              "Kreo",
              "Kreo Selatan",
              "Larangan Indah",
              "Larangan Selatan",
              "Larangan Utara"
            ]
          },
          {
            "name": "Batuceper",
            "postalCode": "15122",
            "villages": [
              "Batuceper",
              "Batujaya",
              "Batusari",
              "Kebon Besar",
              "Poris Gaga",
              "Poris Gaga Baru",
              "Poris Jaya"
            ]
          },
          {
            "name": "Benda",
            "postalCode": "15125",
            "villages": [
              "Belendung",
              "Benda",
              "Jurumudi",
              "Jurumudi Baru",
              "Pajang"
            ]
          },
          {
            "name": "Neglasari",
            "postalCode": "15129",
            "villages": [
              "Karang Anyar",
              "Karangsari",
              "Kedaung Baru",
              "Kedaung Wetan",
              "Mekar Sari",
              "Neglasari",
              "Selapajang Jaya"
            ]
          }
        ]
      },
      {
        "name": "Kota Tangerang Selatan",
        "districts": [
          {
            "name": "Serpong",
            "postalCode": "15310",
            "villages": [
              "Buaran",
              "Ciater",
              "Cilenggang",
              "Lengkong Gudang",
              "Lengkong Gudang Timur",
              "Lengkong Wetan",
              "Rawa Buntu",
              "Rawa Mekar Jaya",
              "Serpong"
            ]
          },
          {
            "name": "Serpong Utara",
            "postalCode": "15320",
            "villages": [
              "Jelupang",
              "Lengkong Karya",
              "Paku Jaya",
              "Pakualam",
              "Pakulonan",
              "Pondok Jagung",
              "Pondok Jagung Timur"
            ]
          },
          {
            "name": "Pondok Aren",
            "postalCode": "15224",
            "villages": [
              "Jurang Mangu Barat",
              "Jurang Mangu Timur",
              "Pondok Kacang Barat",
              "Pondok Kacang Timur",
              "Perigi Lama",
              "Perigi Baru",
              "Pondok Aren",
              "Pondok Karya",
              "Pondok Jaya",
              "Pondok Betung",
              "Pondok Pucung"
            ]
          },
          {
            "name": "Ciputat",
            "postalCode": "15411",
            "villages": [
              "Cipayung",
              "Ciputat",
              "Sawah Baru",
              "Sawah Lama",
              "Jombang",
              "Sarua",
              "Sarua Indah"
            ]
          },
          {
            "name": "Ciputat Timur",
            "postalCode": "15419",
            "villages": [
              "Cempaka Putih",
              "Cireundeu",
              "Pisangan",
              "Pondok Ranji",
              "Rempoa",
              "Rengas"
            ]
          },
          {
            "name": "Pamulang",
            "postalCode": "15417",
            "villages": [
              "Bambu Apus",
              "Benda Baru",
              "Kedaung",
              "Pondok Benda",
              "Pamulang Barat",
              "Pamulang Timur",
              "Pondok Cabe Ilir",
              "Pondok Cabe Udik"
            ]
          },
          {
            "name": "Setu",
            "postalCode": "15314",
            "villages": [
              "Babakan",
              "Bakti Jaya",
              "Kademangan",
              "Keranggan",
              "Muncul",
              "Setu"
            ]
          }
        ]
      },
      {
        "name": "Kota Serang",
        "districts": [
          {
            "name": "Serang",
            "postalCode": "42111",
            "villages": [
              "Kotabaru",
              "Lopang",
              "Kagungan",
              "Serang",
              "Cipare",
              "Sukawana"
            ]
          },
          {
            "name": "Cipocok Jaya",
            "postalCode": "42121",
            "villages": [
              "Banjaragung",
              "Banjarsari",
              "Cipocok Jaya",
              "Dalung",
              "Gelam",
              "Karundang"
            ]
          },
          {
            "name": "Kasemen",
            "postalCode": "42191",
            "villages": [
              "Banten",
              "Kasemen",
              "Kasunyatan",
              "Kilasah",
              "Margaluyu",
              "Mesjid Priyayi",
              "Sawah Luhur"
            ]
          },
          {
            "name": "Taktakan",
            "postalCode": "42162",
            "villages": [
              "Drangong",
              "Kalang Anyar",
              "Kuranji",
              "Lialang",
              "Pancur",
              "Sayar",
              "Taktakan"
            ]
          }
        ]
      },
      {
        "name": "Kota Cilegon",
        "districts": [
          {
            "name": "Cilegon",
            "postalCode": "42416",
            "villages": [
              "Bagendung",
              "Bendungan",
              "Ciwaduk",
              "Ciwandan",
              "Jombang Wetan"
            ]
          },
          {
            "name": "Grogol",
            "postalCode": "42436",
            "villages": [
              "Gerem",
              "Grogol",
              "Kotasari",
              "Rawa Arum"
            ]
          },
          {
            "name": "Pulomerak",
            "postalCode": "42438",
            "villages": [
              "Lebak Gede",
              "Mekarsari",
              "Suralaya",
              "Tamansari"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Serang",
        "districts": [
          {
            "name": "Ciruas",
            "postalCode": "42182",
            "villages": [
              "Ciruas",
              "Bumijaya",
              "Cigelam",
              "Kadikaran",
              "Kaserangan",
              "Pelawad"
            ]
          },
          {
            "name": "Kragilan",
            "postalCode": "42184",
            "villages": [
              "Kragilan",
              "Dukuh",
              "Jeruknipis",
              "Kendayakan",
              "Kramatjati",
              "Pematang"
            ]
          },
          {
            "name": "Cikande",
            "postalCode": "42186",
            "villages": [
              "Cikande",
              "Bakung",
              "Gembor Udik",
              "Julang",
              "Koper",
              "Leuwilimus",
              "Nambo Ilir"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Lebak",
        "districts": [
          {
            "name": "Rangkasbitung",
            "postalCode": "42311",
            "villages": [
              "Cijoro Lebak",
              "Cijoro Pasir",
              "Muara Ciujung Barat",
              "Muara Ciujung Timur",
              "Rangkasbitung Barat",
              "Rangkasbitung Timur"
            ]
          },
          {
            "name": "Maja",
            "postalCode": "42381",
            "villages": [
              "Maja",
              "Ciburuy",
              "Curug Badak",
              "Gubugcibeureum",
              "Maja Baru",
              "Pasir Kecapi",
              "Sangiang"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pandeglang",
        "districts": [
          {
            "name": "Pandeglang",
            "postalCode": "42211",
            "villages": [
              "Pandeglang",
              "Kabayan",
              "Kadomerak",
              "Pagerbatu",
              "Sukasarana"
            ]
          },
          {
            "name": "Majasari",
            "postalCode": "42217",
            "villages": [
              "Cilaja",
              "Karaton",
              "Pagasen",
              "Saruni",
              "Sukajaya"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "dki-jakarta",
    "name": "DKI Jakarta",
    "cities": [
      {
        "name": "Kota Jakarta Barat",
        "districts": [
          {
            "name": "Kalideres",
            "postalCode": "11840",
            "villages": [
              "Kalideres",
              "Kamal",
              "Pegadungan",
              "Semanan",
              "Tegal Alur"
            ]
          },
          {
            "name": "Cengkareng",
            "postalCode": "11730",
            "villages": [
              "Cengkareng Barat",
              "Cengkareng Timur",
              "Duri Kosambi",
              "Kapuk",
              "Kedaung Kali Angke",
              "Rawa Buaya"
            ]
          },
          {
            "name": "Kembangan",
            "postalCode": "11610",
            "villages": [
              "Joglo",
              "Kembangan Selatan",
              "Kembangan Utara",
              "Meruya Selatan",
              "Meruya Utara",
              "Srengseng"
            ]
          },
          {
            "name": "Kebon Jeruk",
            "postalCode": "11530",
            "villages": [
              "Duri Kepa",
              "Kedoya Selatan",
              "Kedoya Utara",
              "Kebon Jeruk",
              "Kelapa Dua",
              "Sukabumi Selatan",
              "Sukabumi Utara"
            ]
          },
          {
            "name": "Grogol Petamburan",
            "postalCode": "11450",
            "villages": [
              "Grogol",
              "Jelambar",
              "Jelambar Baru",
              "Tanjung Duren Selatan",
              "Tanjung Duren Utara",
              "Tomang",
              "Wijaya Kusuma"
            ]
          },
          {
            "name": "Palmerah",
            "postalCode": "11480",
            "villages": [
              "Jatipulo",
              "Kemanggisan",
              "Kota Bambu Selatan",
              "Kota Bambu Utara",
              "Palmerah",
              "Slipi"
            ]
          },
          {
            "name": "Taman Sari",
            "postalCode": "11110",
            "villages": [
              "Glodok",
              "Keagungan",
              "Krukut",
              "Mangga Besar",
              "Maphar",
              "Pinangsia",
              "Taman Sari",
              "Tangki"
            ]
          },
          {
            "name": "Tambora",
            "postalCode": "11210",
            "villages": [
              "Angke",
              "Duri Selatan",
              "Duri Utara",
              "Jembatan Besi",
              "Jembatan Lima",
              "Kali Anyar",
              "Krendang",
              "Pekojan",
              "Roa Malaka",
              "Tambora",
              "Tanah Sereal"
            ]
          }
        ]
      },
      {
        "name": "Kota Jakarta Selatan",
        "districts": [
          {
            "name": "Kebayoran Baru",
            "postalCode": "12110",
            "villages": [
              "Cipete Utara",
              "Gandaria Utara",
              "Gunung",
              "Kramat Pela",
              "Melawai",
              "Petogogan",
              "Pulo",
              "Rawa Barat",
              "Selong",
              "Senayan"
            ]
          },
          {
            "name": "Kebayoran Lama",
            "postalCode": "12240",
            "villages": [
              "Cipulir",
              "Grogol Selatan",
              "Grogol Utara",
              "Kebayoran Lama Selatan",
              "Kebayoran Lama Utara",
              "Pondok Pinang"
            ]
          },
          {
            "name": "Pesanggrahan",
            "postalCode": "12250",
            "villages": [
              "Bintaro",
              "Pesanggrahan",
              "Petukangan Selatan",
              "Petukangan Utara",
              "Ulujami"
            ]
          },
          {
            "name": "Cilandak",
            "postalCode": "12430",
            "villages": [
              "Cilandak Barat",
              "Cipete Selatan",
              "Gandaria Selatan",
              "Lebak Bulus",
              "Pondok Labu"
            ]
          },
          {
            "name": "Pasar Minggu",
            "postalCode": "12520",
            "villages": [
              "Cilandak Timur",
              "Jati Padang",
              "Kebagusan",
              "Pasar Minggu",
              "Pejaten Barat",
              "Pejaten Timur",
              "Ragunan"
            ]
          },
          {
            "name": "Jagakarsa",
            "postalCode": "12620",
            "villages": [
              "Ciganjur",
              "Cipedak",
              "Jagakarsa",
              "Lenteng Agung",
              "Srengseng Sawah",
              "Tanjung Barat"
            ]
          },
          {
            "name": "Mampang Prapatan",
            "postalCode": "12790",
            "villages": [
              "Bangka",
              "Kuningan Barat",
              "Mampang Prapatan",
              "Pela Mampang",
              "Tegal Parang"
            ]
          },
          {
            "name": "Pancoran",
            "postalCode": "12780",
            "villages": [
              "Cikoko",
              "Duren Tiga",
              "Kalibata",
              "Pancoran",
              "Pengadegan",
              "Rawajati"
            ]
          },
          {
            "name": "Tebet",
            "postalCode": "12810",
            "villages": [
              "Bukit Duri",
              "Kebon Baru",
              "Manggarai",
              "Manggarai Selatan",
              "Menteng Dalam",
              "Tebet Barat",
              "Tebet Timur"
            ]
          },
          {
            "name": "Setiabudi",
            "postalCode": "12910",
            "villages": [
              "Guntur",
              "Karet",
              "Karet Kuningan",
              "Karet Semanggi",
              "Kuningan Timur",
              "Menteng Atas",
              "Pasar Manggis",
              "Setiabudi"
            ]
          }
        ]
      },
      {
        "name": "Kota Jakarta Pusat",
        "districts": [
          {
            "name": "Gambir",
            "postalCode": "10110",
            "villages": [
              "Cideng",
              "Duri Pulo",
              "Gambir",
              "Kebon Kelapa",
              "Petojo Selatan",
              "Petojo Utara"
            ]
          },
          {
            "name": "Tanah Abang",
            "postalCode": "10210",
            "villages": [
              "Bendungan Hilir",
              "Gelora",
              "Kampung Bali",
              "Karet Tengsin",
              "Kebon Kacang",
              "Kebon Melati",
              "Petamburan"
            ]
          },
          {
            "name": "Menteng",
            "postalCode": "10310",
            "villages": [
              "Cikini",
              "Gondangdia",
              "Kebon Sirih",
              "Menteng",
              "Pegangsaan"
            ]
          },
          {
            "name": "Senen",
            "postalCode": "10410",
            "villages": [
              "Bungur",
              "Kenari",
              "Kramat",
              "Kwitang",
              "Paseban",
              "Senen"
            ]
          },
          {
            "name": "Cempaka Putih",
            "postalCode": "10510",
            "villages": [
              "Cempaka Putih Barat",
              "Cempaka Putih Timur",
              "Rawasari"
            ]
          },
          {
            "name": "Johar Baru",
            "postalCode": "10560",
            "villages": [
              "Galur",
              "Johar Baru",
              "Kampung Rawa",
              "Tanah Tinggi"
            ]
          },
          {
            "name": "Kemayoran",
            "postalCode": "10610",
            "villages": [
              "Cempaka Baru",
              "Gunung Sahari Selatan",
              "Harapan Mulya",
              "Kebon Kosong",
              "Kemayoran",
              "Serdang",
              "Sumur Batu",
              "Utan Panjang"
            ]
          },
          {
            "name": "Sawah Besar",
            "postalCode": "10710",
            "villages": [
              "Gunung Sahari Utara",
              "Karang Anyar",
              "Kartini",
              "Mangga Dua Selatan",
              "Pasar Baru"
            ]
          }
        ]
      },
      {
        "name": "Kota Jakarta Timur",
        "districts": [
          {
            "name": "Matraman",
            "postalCode": "13110",
            "villages": [
              "Kayu Manis",
              "Kebon Manggis",
              "Pal Riam",
              "Pisangan Baru",
              "Utan Kayu Selatan",
              "Utan Kayu Utara"
            ]
          },
          {
            "name": "Pulogadung",
            "postalCode": "13210",
            "villages": [
              "Cipinang",
              "Jati",
              "Jatinegara Kaum",
              "Kayu Putih",
              "Pisangan Timur",
              "Pulo Gadung",
              "Rawamangun"
            ]
          },
          {
            "name": "Jatinegara",
            "postalCode": "13310",
            "villages": [
              "Bali Mester",
              "Bidara Cina",
              "Cipinang Besar Selatan",
              "Cipinang Besar Utara",
              "Cipinang Cempedak",
              "Cipinang Muara",
              "Kampung Melayu",
              "Rawa Bunga"
            ]
          },
          {
            "name": "Kramat Jati",
            "postalCode": "13510",
            "villages": [
              "Balekambang",
              "Batu Ampar",
              "Cawang",
              "Cililitan",
              "Dukuh",
              "Kramat Jati",
              "Tengah"
            ]
          },
          {
            "name": "Duren Sawit",
            "postalCode": "13440",
            "villages": [
              "Duren Sawit",
              "Klender",
              "Malaka Jaya",
              "Malaka Sari",
              "Pondok Bambu",
              "Pondok Kelapa",
              "Pondok Kopi"
            ]
          },
          {
            "name": "Cakung",
            "postalCode": "13910",
            "villages": [
              "Cakung Barat",
              "Cakung Timur",
              "Jatinegara",
              "Penggilingan",
              "Pulo Gebang",
              "Rawa Terate",
              "Ujung Menteng"
            ]
          }
        ]
      },
      {
        "name": "Kota Jakarta Utara",
        "districts": [
          {
            "name": "Penjaringan",
            "postalCode": "14440",
            "villages": [
              "Kamal Muara",
              "Kapuk Muara",
              "Pejagalan",
              "Penjaringan",
              "Pluit"
            ]
          },
          {
            "name": "Pademangan",
            "postalCode": "14420",
            "villages": [
              "Ancol",
              "Pademangan Barat",
              "Pademangan Timur"
            ]
          },
          {
            "name": "Tanjung Priok",
            "postalCode": "14310",
            "villages": [
              "Kebon Bawang",
              "Papanggo",
              "Sungai Bambu",
              "Sunter Agung",
              "Sunter Jaya",
              "Tanjung Priok",
              "Warakas"
            ]
          },
          {
            "name": "Kelapa Gading",
            "postalCode": "14240",
            "villages": [
              "Kelapa Gading Barat",
              "Kelapa Gading Timur",
              "Pegangsaan Dua"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kepulauan Seribu",
        "districts": [
          {
            "name": "Kepulauan Seribu Utara",
            "postalCode": "14530",
            "villages": [
              "Pulau Harapan",
              "Pulau Kelapa",
              "Pulau Panggang"
            ]
          },
          {
            "name": "Kepulauan Seribu Selatan",
            "postalCode": "14520",
            "villages": [
              "Pulau Pari",
              "Pulau Tidung",
              "Pulau Untung Jawa"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "jawa-barat",
    "name": "Jawa Barat",
    "cities": [
      {
        "name": "Kota Bandung",
        "districts": [
          {
            "name": "Coblong",
            "postalCode": "40132",
            "villages": [
              "Cipaganti",
              "Dago",
              "Lebak Gede",
              "Lebak Siliwangi",
              "Sadang Serang",
              "Sekeloa"
            ]
          },
          {
            "name": "Cicendo",
            "postalCode": "40171",
            "villages": [
              "Arjuna",
              "Husen Sastranegara",
              "Pajajaran",
              "Pamoyanan",
              "Pasirkaliki",
              "Sukaraja"
            ]
          },
          {
            "name": "Sumur Bandung",
            "postalCode": "40111",
            "villages": [
              "Babakan Ciamis",
              "Braga",
              "Kebon Pisang",
              "Merdeka"
            ]
          },
          {
            "name": "Lengkong",
            "postalCode": "40261",
            "villages": [
              "Burangrang",
              "Cijagra",
              "Cikawao",
              "Lingkar Selatan",
              "Malabar",
              "Paledang",
              "Turangga"
            ]
          }
        ]
      },
      {
        "name": "Kota Bekasi",
        "districts": [
          {
            "name": "Bekasi Barat",
            "postalCode": "17145",
            "villages": [
              "Bintara",
              "Bintara Jaya",
              "Jakasampurna",
              "Kota Baru",
              "Kranji"
            ]
          },
          {
            "name": "Bekasi Selatan",
            "postalCode": "17148",
            "villages": [
              "Jaka Mulya",
              "Jaka Setia",
              "Kayuringin Jaya",
              "Mekar Jaya",
              "Pekayon Jaya"
            ]
          },
          {
            "name": "Bekasi Timur",
            "postalCode": "17111",
            "villages": [
              "Aren Jaya",
              "Bekasi Jaya",
              "Duren Jaya",
              "Margahayu"
            ]
          },
          {
            "name": "Bekasi Utara",
            "postalCode": "17121",
            "villages": [
              "Harapan Baru",
              "Harapan Jaya",
              "Kaliabang Tengah",
              "Marga Mulya",
              "Perwira",
              "Teluk Pucung"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bekasi",
        "districts": [
          {
            "name": "Cikarang Pusat",
            "postalCode": "17530",
            "villages": [
              "Cicau",
              "Hegarmukti",
              "Jayamukti",
              "Pasirranji",
              "Pasirtanjung",
              "Sukamahi"
            ]
          },
          {
            "name": "Cikarang Barat",
            "postalCode": "17520",
            "villages": [
              "Cikedokan",
              "Danau Indah",
              "Gandamekar",
              "Gandasari",
              "Jatiwangi",
              "Kalijaya",
              "Mekarwangi",
              "Sukadanau",
              "Telaga Asih",
              "Telagamurni",
              "Telajung"
            ]
          },
          {
            "name": "Tambun Selatan",
            "postalCode": "17510",
            "villages": [
              "Jatimulya",
              "Lambangjaya",
              "Lambangsari",
              "Mangunjaya",
              "Setiadarma",
              "Setiamekar",
              "Sumberjaya",
              "Tambun",
              "Tridaya Sakti"
            ]
          }
        ]
      },
      {
        "name": "Kota Bogor",
        "districts": [
          {
            "name": "Bogor Tengah",
            "postalCode": "16121",
            "villages": [
              "Babakan",
              "Babakan Pasar",
              "Cibogor",
              "Ciwaringin",
              "Gudang",
              "Kebon Kelapa",
              "Pabaton",
              "Paledang",
              "Panaragan",
              "Sempur",
              "Tegallega"
            ]
          },
          {
            "name": "Bogor Timur",
            "postalCode": "16142",
            "villages": [
              "Baranangsiang",
              "Katulampa",
              "Sindangrasa",
              "Sindangbarang",
              "Sukasari",
              "Tajur"
            ]
          },
          {
            "name": "Bogor Selatan",
            "postalCode": "16131",
            "villages": [
              "Batutulis",
              "Bojongkerta",
              "Bondongan",
              "Cikaret",
              "Cipaku",
              "Empang",
              "Genteng",
              "Harjasari",
              "Kertamaya",
              "Lawanggintung",
              "Muarasari",
              "Mulyaharja",
              "Pakuan",
              "Pamoyanan",
              "Rancamaya",
              "Ranggamekar"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bogor",
        "districts": [
          {
            "name": "Cibinong",
            "postalCode": "16911",
            "villages": [
              "Cibinong",
              "Cirimekar",
              "Ciriung",
              "Harapan Jaya",
              "Karadenan",
              "Nanggewer",
              "Nanggewer Mekar",
              "Pabuaran",
              "Pabuaran Mekar",
              "Pakansari",
              "Pondok Rajeg",
              "Sukahati",
              "Tengah"
            ]
          },
          {
            "name": "Babakan Madang",
            "postalCode": "16810",
            "villages": [
              "Babakan Madang",
              "Bojong Koneng",
              "Cadas Ngampar",
              "Cibanon",
              "Cijayanti",
              "Cipambuan",
              "Kadumangu",
              "Karang Tengah",
              "Sentul",
              "Sumur Batu"
            ]
          }
        ]
      },
      {
        "name": "Kota Depok",
        "districts": [
          {
            "name": "Pancoran Mas",
            "postalCode": "16436",
            "villages": [
              "Depok",
              "Depok Jaya",
              "Mampang",
              "Pancoran Mas",
              "Rangkapan Jaya",
              "Rangkapan Jaya Baru"
            ]
          },
          {
            "name": "Cinere",
            "postalCode": "16514",
            "villages": [
              "Cinere",
              "Gandul",
              "Pangkalan Jati",
              "Pangkalan Jati Baru"
            ]
          },
          {
            "name": "Beji",
            "postalCode": "16421",
            "villages": [
              "Beji",
              "Beji Timur",
              "Kemiri Muka",
              "Kukusan",
              "Pondok Cina",
              "Tanah Baru"
            ]
          },
          {
            "name": "Sukmajaya",
            "postalCode": "16412",
            "villages": [
              "Abadijaya",
              "Bakti Jaya",
              "Cisalak",
              "Mekar Jaya",
              "Sukmajaya",
              "Tirtajaya"
            ]
          }
        ]
      },
      {
        "name": "Kota Cimahi",
        "districts": [
          {
            "name": "Cimahi Utara",
            "postalCode": "40511",
            "villages": [
              "Cibabat",
              "Cipageran",
              "Citeureup",
              "Pasirkaliki"
            ]
          },
          {
            "name": "Cimahi Tengah",
            "postalCode": "40521",
            "villages": [
              "Baros",
              "Cigugur Tengah",
              "Cimahi",
              "Karangmekar",
              "Padasuka",
              "Setiamanah"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bandung",
        "districts": [
          {
            "name": "Soreang",
            "postalCode": "40911",
            "villages": [
              "Cingcin",
              "Karamatmulya",
              "Panyirapan",
              "Parungserab",
              "Sadu",
              "Sekarwangi",
              "Soreang",
              "Sukajadi"
            ]
          },
          {
            "name": "Baleendah",
            "postalCode": "40375",
            "villages": [
              "Andir",
              "Baleendah",
              "Bojongsari",
              "Jelegong",
              "Malakasari",
              "Manggahang",
              "Rancamanyar",
              "Wargamekar"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bandung Barat",
        "districts": [
          {
            "name": "Padalarang",
            "postalCode": "40553",
            "villages": [
              "Ciburuy",
              "Cimerang",
              "Cipeundeuy",
              "Jayamekar",
              "Kertajaya",
              "Kertamulya",
              "Laksanamekar",
              "Padalarang",
              "Tagogapu"
            ]
          },
          {
            "name": "Lembang",
            "postalCode": "40391",
            "villages": [
              "Cibogo",
              "Cikahuripan",
              "Cikidang",
              "Cikole",
              "Gudangkahuripan",
              "Jayagiri",
              "Kayuambon",
              "Lembang",
              "Pagerwangi",
              "Sukajaya",
              "Suntenjaya",
              "Wangunharja",
              "Wangunsari"
            ]
          }
        ]
      },
      {
        "name": "Kota Cirebon",
        "districts": [
          {
            "name": "Kejaksan",
            "postalCode": "45121",
            "villages": [
              "Kebonbaru",
              "Kejaksan",
              "Kesenden",
              "Sukapura"
            ]
          },
          {
            "name": "Kesambi",
            "postalCode": "45131",
            "villages": [
              "Drajat",
              "Karyamulya",
              "Kesambi",
              "Pekiringan",
              "Sunyaragi"
            ]
          }
        ]
      },
      {
        "name": "Kota Sukabumi",
        "districts": [
          {
            "name": "Cikole",
            "postalCode": "43111",
            "villages": [
              "Cikole",
              "Cisarua",
              "Gunungparang",
              "Kebonjati",
              "Selabatu",
              "Subangjaya"
            ]
          }
        ]
      },
      {
        "name": "Kota Tasikmalaya",
        "districts": [
          {
            "name": "Cihideung",
            "postalCode": "46121",
            "villages": [
              "Argasari",
              "Cilembang",
              "Nagarawangi",
              "Tugujaya",
              "Tuguraja",
              "Yudanagara"
            ]
          }
        ]
      },
      {
        "name": "Kota Banjar",
        "districts": [
          {
            "name": "Banjar",
            "postalCode": "46311",
            "villages": [
              "Balokang",
              "Banjar",
              "Jatitujuh",
              "Mekarsari",
              "Situbatu"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Karawang",
        "districts": [
          {
            "name": "Karawang Barat",
            "postalCode": "41311",
            "villages": [
              "Nagasepaha",
              "Karangpawitan",
              "Tanjungmekar",
              "Tanjungpura",
              "Tunggakjati"
            ]
          },
          {
            "name": "Karawang Timur",
            "postalCode": "41314",
            "villages": [
              "Adiarsa Timur",
              "Karawang Wetan",
              "Kondangjaya",
              "Palumbonsari",
              "Plawad",
              "Tegalsawah"
            ]
          },
          {
            "name": "Telukjambe Timur",
            "postalCode": "41361",
            "villages": [
              "Pinayungan",
              "Purwadana",
              "Puseurjaya",
              "Sirnabaya",
              "Sukaharja",
              "Sukaluyu",
              "Telukjambe",
              "Wadas"
            ]
          },
          {
            "name": "Klari",
            "postalCode": "41371",
            "villages": [
              "Anggadita",
              "Belendung",
              "Cibalongsari",
              "Curug",
              "Duren",
              "Gintungkerta",
              "Karanganyar",
              "Kiarapayung",
              "Klari",
              "Pancawati",
              "Sumurkondang"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Purwakarta",
        "districts": [
          {
            "name": "Purwakarta",
            "postalCode": "41111",
            "villages": [
              "Cipaisan",
              "Ciseureuh",
              "Munjuljaya",
              "Nagri Kaler",
              "Nagri Kidul",
              "Nagri Tengah",
              "Purwamekar",
              "Sindangkasih"
            ]
          },
          {
            "name": "Campaka",
            "postalCode": "41181",
            "villages": [
              "Campaka",
              "Campakasari",
              "Cijunti",
              "Cisaat",
              "Kertamukti"
            ]
          },
          {
            "name": "Jatiluhur",
            "postalCode": "41152",
            "villages": [
              "Binarum",
              "Cikaobandung",
              "Cilegong",
              "Cisalada",
              "Jatiluhur",
              "Kembangkuning",
              "Parakanlima"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Subang",
        "districts": [
          {
            "name": "Subang",
            "postalCode": "41211",
            "villages": [
              "Dangdeur",
              "Karanganyar",
              "Parung",
              "Pasirkareumbi",
              "Soklat",
              "Subang",
              "Wanareja"
            ]
          },
          {
            "name": "Kalijati",
            "postalCode": "41271",
            "villages": [
              "Caracas",
              "Ciruluk",
              "Jalupang",
              "Kalijati Barat",
              "Kalijati Timur",
              "Tanggulun Barat",
              "Tanggulun Timur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sukabumi",
        "districts": [
          {
            "name": "Palabuhanratu",
            "postalCode": "43364",
            "villages": [
              "Cikadu",
              "Citarik",
              "Citepus",
              "Palabuhanratu",
              "Pasirsuren",
              "Tonjong"
            ]
          },
          {
            "name": "Cibadak",
            "postalCode": "43351",
            "villages": [
              "Batununggal",
              "Cibadak",
              "Ciheulang Tonggoh",
              "Karangtengah",
              "Neglasari",
              "Pamuruyan",
              "Sukasirna"
            ]
          },
          {
            "name": "Cisaat",
            "postalCode": "43152",
            "villages": [
              "Babakan",
              "Cibolang Kaler",
              "Cisaat",
              "Kutasirna",
              "Nagrak",
              "Padaasih",
              "Selajambe",
              "Sukamanah",
              "Sukamantri",
              "Sukaresmi"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Cianjur",
        "districts": [
          {
            "name": "Cianjur",
            "postalCode": "43211",
            "villages": [
              "Babakankaret",
              "Bojongherang",
              "Limbangansari",
              "Mekarsari",
              "Muka",
              "Nagrak",
              "Pamoyanan",
              "Sawah Gede",
              "Sayang",
              "Solokpandan"
            ]
          },
          {
            "name": "Cipanas",
            "postalCode": "43253",
            "villages": [
              "Batulawang",
              "Ciloto",
              "Cimacan",
              "Cipanas",
              "Gadog",
              "Palasari",
              "Sindangjaya",
              "Sindanglaya"
            ]
          }
        ]
      },
      {
        "name": "Kota Cirebon",
        "districts": [
          {
            "name": "Kejaksan",
            "postalCode": "45121",
            "villages": [
              "Kebonbaru",
              "Kejaksan",
              "Kesenden",
              "Sukapura"
            ]
          },
          {
            "name": "Kesambi",
            "postalCode": "45131",
            "villages": [
              "Drajat",
              "Karyamulya",
              "Kesambi",
              "Pekiringan",
              "Sunyaragi"
            ]
          },
          {
            "name": "Lemahwungkuk",
            "postalCode": "45111",
            "villages": [
              "Kasepuhan",
              "Lemahwungkuk",
              "Panjunan",
              "Pegambiran"
            ]
          },
          {
            "name": "Harjamukti",
            "postalCode": "45141",
            "villages": [
              "Argasunya",
              "Harjamukti",
              "Kalijaga",
              "Kecapi",
              "Larangan"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Cirebon",
        "districts": [
          {
            "name": "Sumber",
            "postalCode": "45611",
            "villages": [
              "Babakan",
              "Gegunung",
              "Kaliwadas",
              "Kemantren",
              "Matangaji",
              "Pasalakan",
              "Perbutulan",
              "Sendang",
              "Sidawangi",
              "Sumber",
              "Tukmudal"
            ]
          },
          {
            "name": "Kedawung",
            "postalCode": "45153",
            "villages": [
              "Kalikoa",
              "Kedawung",
              "Kedungdawa",
              "Kedungjaya",
              "Kertawinangun",
              "Pilangsari",
              "Sutawinangun",
              "Tuk"
            ]
          }
        ]
      },
      {
        "name": "Kota Sukabumi",
        "districts": [
          {
            "name": "Cikole",
            "postalCode": "43111",
            "villages": [
              "Cikole",
              "Cisarua",
              "Gunungparang",
              "Kebonjati",
              "Selabatu",
              "Subangjaya"
            ]
          },
          {
            "name": "Citamiang",
            "postalCode": "43141",
            "villages": [
              "Cikondang",
              "Citamiang",
              "Gedongpanjang",
              "Nanggeleng",
              "Tipar"
            ]
          }
        ]
      },
      {
        "name": "Kota Tasikmalaya",
        "districts": [
          {
            "name": "Cihideung",
            "postalCode": "46121",
            "villages": [
              "Argasari",
              "Cilembang",
              "Nagarawangi",
              "Tuguraja",
              "Tugujaya",
              "Yudanagara"
            ]
          },
          {
            "name": "Tawang",
            "postalCode": "46111",
            "villages": [
              "Cikalang",
              "Empangsari",
              "Kahuripan",
              "Lengkongsari",
              "Tawangsari"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Garut",
        "districts": [
          {
            "name": "Garut Kota",
            "postalCode": "44111",
            "villages": [
              "Cimuncang",
              "Ciwalen",
              "Kota Kulon",
              "Kota Wetan",
              "Margawati",
              "Muara Sanding",
              "Pakuwon",
              "Paminggir",
              "Regol",
              "Sukamentri"
            ]
          },
          {
            "name": "Tarogong Kidul",
            "postalCode": "44151",
            "villages": [
              "Haurpanggung",
              "Jayaraga",
              "Pataruman",
              "Sukabakti",
              "Sukajaya",
              "Sukakarya",
              "Tarogong"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sumedang",
        "districts": [
          {
            "name": "Sumedang Utara",
            "postalCode": "45321",
            "villages": [
              "Kebonkalapa",
              "Kotakaler",
              "Padasuka",
              "Situ",
              "Talun"
            ]
          },
          {
            "name": "Jatinangor",
            "postalCode": "45363",
            "villages": [
              "Cibeusi",
              "Cikeruh",
              "Cilayung",
              "Cipacing",
              "Cisempur",
              "Hegarmanah",
              "Jatimukti",
              "Jatiroke",
              "Sayang"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Indramayu",
        "districts": [
          {
            "name": "Indramayu",
            "postalCode": "45211",
            "villages": [
              "Bojongsari",
              "Dukuh",
              "Karanganyar",
              "Karangmalang",
              "Kepandean",
              "Lemahabang",
              "Lemahmekar",
              "Margadadi",
              "Paoman",
              "Pekandangan",
              "Plumbon",
              "Singajaya",
              "Singaraja"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Majalengka",
        "districts": [
          {
            "name": "Majalengka",
            "postalCode": "45411",
            "villages": [
              "Babakan Jawa",
              "Cicurug",
              "Cijati",
              "Cikasarung",
              "Majalengka Kulon",
              "Majalengka Wetan",
              "Munjul",
              "Taru"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kuningan",
        "districts": [
          {
            "name": "Kuningan",
            "postalCode": "45511",
            "villages": [
              "Ancaran",
              "Cigintung",
              "Cijoho",
              "Ciporang",
              "Kuningan",
              "Purwawinangun",
              "Winduhaji",
              "Windusengkahan"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Ciamis",
        "districts": [
          {
            "name": "Ciamis Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Ciamis I",
              "Kelurahan Ciamis II",
              "Desa Ciamis Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Ciamis Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pangandaran",
        "districts": [
          {
            "name": "Pangandaran Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pangandaran I",
              "Kelurahan Pangandaran II",
              "Desa Pangandaran Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pangandaran Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "jawa-tengah",
    "name": "Jawa Tengah",
    "cities": [
      {
        "name": "Kota Semarang",
        "districts": [
          {
            "name": "Semarang Tengah",
            "postalCode": "50132",
            "villages": [
              "Bangunharjo",
              "Brumbungan",
              "Gabahan",
              "Jagalan",
              "Karangkidul",
              "Kauman",
              "Kembangsari",
              "Kranggan",
              "Miroto",
              "Pandansari",
              "Pekunden",
              "Pendrikan Kidul",
              "Pendrikan Lor",
              "Purwodinatan",
              "Sekayu"
            ]
          },
          {
            "name": "Banyumanik",
            "postalCode": "50264",
            "villages": [
              "Banyumanik",
              "Gedawang",
              "Jabungan",
              "Ngesrep",
              "Padangsari",
              "Pedalangan",
              "Pudakpayung",
              "Srondol Kulon",
              "Srondol Wetan",
              "Sumurboto",
              "Tinjomoyo"
            ]
          }
        ]
      },
      {
        "name": "Kota Surakarta (Solo)",
        "districts": [
          {
            "name": "Banjarsari",
            "postalCode": "57131",
            "villages": [
              "Banjarsari",
              "Gilingan",
              "Kadipiro",
              "Keprabon",
              "Kestalan",
              "Ketelan",
              "Manahan",
              "Mangkubumen",
              "Nusukan",
              "Punggawan",
              "Setabelan",
              "Sumber",
              "Timuran"
            ]
          },
          {
            "name": "Laweyan",
            "postalCode": "57141",
            "villages": [
              "Bumi",
              "Jajar",
              "Karangasem",
              "Kerten",
              "Laweyan",
              "Pajang",
              "Panularan",
              "Penumping",
              "Purwosari",
              "Sondakan",
              "Sriwedari"
            ]
          }
        ]
      },
      {
        "name": "Kota Magelang",
        "districts": [
          {
            "name": "Magelang Tengah",
            "postalCode": "56111",
            "villages": [
              "Cacaban",
              "Gelangan",
              "Magelang",
              "Panjatan",
              "Rejowinangun Utara"
            ]
          }
        ]
      },
      {
        "name": "Kota Pekalongan",
        "districts": [
          {
            "name": "Pekalongan Barat",
            "postalCode": "51111",
            "villages": [
              "Bendan",
              "Kergon",
              "Medono",
              "Pasirkratonkramat",
              "Pringrejo",
              "Sapuro Kebulen",
              "Tirto"
            ]
          }
        ]
      },
      {
        "name": "Kota Tegal",
        "districts": [
          {
            "name": "Tegal Barat",
            "postalCode": "52111",
            "villages": [
              "Kraton",
              "Kemandungan",
              "Muarareja",
              "Pekauman",
              "Pesurungan Kidul",
              "Tegalsari"
            ]
          }
        ]
      },
      {
        "name": "Kota Salatiga",
        "districts": [
          {
            "name": "Sidorejo",
            "postalCode": "50711",
            "villages": [
              "Blotongan",
              "Bugel",
              "Kauman Kidul",
              "Pulutan",
              "Salatiga",
              "Sidorejo Lor"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Banyumas (Purwokerto)",
        "districts": [
          {
            "name": "Purwokerto Timur",
            "postalCode": "53111",
            "villages": [
              "Arcawinangun",
              "Kranji",
              "Mersi",
              "Purwokerto Lor",
              "Purwokerto Wetan",
              "Sokanegara"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kudus",
        "districts": [
          {
            "name": "Kota Kudus",
            "postalCode": "59311",
            "villages": [
              "Barongan",
              "Burikan",
              "Demaan",
              "Demangan",
              "Glantengan",
              "Janggalan",
              "Kajeksan",
              "Kerjasan",
              "Kragan",
              "Mlati Kidul",
              "Mlati Lor",
              "Mlati Norowito",
              "Nganguk",
              "Panjunan",
              "Purwosari",
              "Rendeng",
              "Singocandi",
              "Wergu Kulon",
              "Wergu Wetan"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Semarang",
        "districts": [
          {
            "name": "Ungaran Barat",
            "postalCode": "50511",
            "villages": [
              "Bandarjo",
              "Candirejo",
              "Genuk",
              "Gogik",
              "Kalisidi",
              "Keji",
              "Kerep",
              "Langensari",
              "Lerep",
              "Ungaran"
            ]
          },
          {
            "name": "Ungaran Timur",
            "postalCode": "50514",
            "villages": [
              "Gedangan",
              "Kalikayen",
              "Kalongan",
              "Kalirejo",
              "Kawengen",
              "Leyangan",
              "Mluweh",
              "Sidomulyo",
              "Susukan"
            ]
          },
          {
            "name": "Ambarawa",
            "postalCode": "50611",
            "villages": [
              "Baran",
              "Bejalen",
              "Kranggan",
              "Kupang",
              "Lodoyong",
              "Ngampin",
              "Panjang",
              "Pojoksari",
              "Tambakboyo"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Cilacap",
        "districts": [
          {
            "name": "Cilacap Tengah",
            "postalCode": "53221",
            "villages": [
              "Donan",
              "Gunungsimping",
              "Kutawaru",
              "Lomanis",
              "Sidanegara"
            ]
          },
          {
            "name": "Cilacap Selatan",
            "postalCode": "53211",
            "villages": [
              "Cilacap",
              "Sidakaya",
              "Tambakreja",
              "Tegalreja",
              "Tegal Kamulyan"
            ]
          },
          {
            "name": "Cilacap Utara",
            "postalCode": "53231",
            "villages": [
              "Gumamang",
              "Karangtalun",
              "Kebonmanis",
              "Mertasinga",
              "Tritih Kulon"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Klaten",
        "districts": [
          {
            "name": "Klaten Tengah",
            "postalCode": "57411",
            "villages": [
              "Buntalan",
              "Jomboran",
              "Klaten",
              "Mojayan",
              "Semangkak",
              "Tonggalan"
            ]
          },
          {
            "name": "Klaten Utara",
            "postalCode": "57431",
            "villages": [
              "Bareng Lor",
              "Belang Wetan",
              "Gergunung",
              "Jonggrangan",
              "Karanganom",
              "Ketandan",
              "Sekarsuli"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sukoharjo",
        "districts": [
          {
            "name": "Sukoharjo",
            "postalCode": "57511",
            "villages": [
              "Banmati",
              "Begajah",
              "Bulakrejo",
              "Combongan",
              "Dukuh",
              "Gayam",
              "Jetis",
              "Joho",
              "Kenep",
              "Kriwen",
              "Mandan",
              "Sukoharjo"
            ]
          },
          {
            "name": "Kartasura",
            "postalCode": "57161",
            "villages": [
              "Gonilan",
              "Gumpang",
              "Kartasura",
              "Kertonatan",
              "Makamhaji",
              "Ngabeyan",
              "Ngadirejo",
              "Ngemplak",
              "Pabelan",
              "Pucangan",
              "Singopuran",
              "Wirogunan"
            ]
          },
          {
            "name": "Grogol",
            "postalCode": "57552",
            "villages": [
              "Cemani",
              "Gedangan",
              "Grogol",
              "Kadokan",
              "Kwarasan",
              "Langenharjo",
              "Madegondo",
              "Manang",
              "Parangjoro",
              "Pondok",
              "Sanggrahan",
              "Telukan"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Karanganyar",
        "districts": [
          {
            "name": "Karanganyar",
            "postalCode": "57711",
            "villages": [
              "Bejen",
              "Bolong",
              "Cangakan",
              "Delingan",
              "Gayamprit",
              "Gedong",
              "Jantiharjo",
              "Jungke",
              "Karanganyar",
              "Lalung",
              "Popongan",
              "Tegalgede"
            ]
          },
          {
            "name": "Colomadu",
            "postalCode": "57171",
            "villages": [
              "Baturan",
              "Blulukan",
              "Bolon",
              "Gajahan",
              "Gawanan",
              "Gedongan",
              "Klodran",
              "Malangjiwan",
              "Ngasem",
              "Paulan",
              "Tohudan"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tegal",
        "districts": [
          {
            "name": "Slawi",
            "postalCode": "52411",
            "villages": [
              "Dukuhwringin",
              "Dukuhsalam",
              "Kalisapu",
              "Kudaile",
              "Pakembaran",
              "Procot",
              "Slawi Kulon",
              "Slawi Wetan"
            ]
          },
          {
            "name": "Adiwerna",
            "postalCode": "52413",
            "villages": [
              "Adiwerna",
              "Bersole",
              "Gumalar",
              "Harjosari Kidul",
              "Harjosari Lor",
              "Kaliwadas",
              "Lemahduwur",
              "Pagiyanten",
              "Pecangakan",
              "Tembok Banjaran",
              "Tembok Luwung"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Brebes",
        "districts": [
          {
            "name": "Brebes",
            "postalCode": "52211",
            "villages": [
              "Brebes",
              "Gandasuli",
              "Kaligangsa Kulon",
              "Kaligangsa Wetan",
              "Kalimati",
              "Kaliwlingi",
              "Krasak",
              "Limbangan Kulon",
              "Limbangan Wetan",
              "Pasarbatang",
              "Pemaron",
              "Pulosari",
              "Randusanga Kulon",
              "Randusanga Wetan",
              "Sigambir",
              "Terlangu",
              "Wangandalem"
            ]
          },
          {
            "name": "Bumiayu",
            "postalCode": "52273",
            "villages": [
              "Bumiayu",
              "Dukuhturi",
              "Jatisawit",
              "Kalierang",
              "Langkap",
              "Laren",
              "Negaradaha",
              "Pamijen",
              "Penggarutan",
              "Pruwatan"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Boyolali",
        "districts": [
          {
            "name": "Boyolali",
            "postalCode": "57311",
            "villages": [
              "Banaran",
              "Boyolali",
              "Karanggeneng",
              "Kebonbimo",
              "Kiringan",
              "Mulyorejo",
              "Penggung",
              "Pulisen",
              "Siswodipuran"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Banjarnegara",
        "districts": [
          {
            "name": "Banjarnegara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Banjarnegara I",
              "Kelurahan Banjarnegara II",
              "Desa Banjarnegara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Banjarnegara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Banyumas",
        "districts": [
          {
            "name": "Banyumas Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Banyumas I",
              "Kelurahan Banyumas II",
              "Desa Banyumas Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Banyumas Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Batang",
        "districts": [
          {
            "name": "Batang Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Batang I",
              "Kelurahan Batang II",
              "Desa Batang Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Batang Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Blora",
        "districts": [
          {
            "name": "Blora Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Blora I",
              "Kelurahan Blora II",
              "Desa Blora Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Blora Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Demak",
        "districts": [
          {
            "name": "Demak Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Demak I",
              "Kelurahan Demak II",
              "Desa Demak Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Demak Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Grobogan",
        "districts": [
          {
            "name": "Grobogan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Grobogan I",
              "Kelurahan Grobogan II",
              "Desa Grobogan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Grobogan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Jepara",
        "districts": [
          {
            "name": "Jepara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Jepara I",
              "Kelurahan Jepara II",
              "Desa Jepara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Jepara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kebumen",
        "districts": [
          {
            "name": "Kebumen Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kebumen I",
              "Kelurahan Kebumen II",
              "Desa Kebumen Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kebumen Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kendal",
        "districts": [
          {
            "name": "Kendal Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kendal I",
              "Kelurahan Kendal II",
              "Desa Kendal Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kendal Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pati",
        "districts": [
          {
            "name": "Pati Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pati I",
              "Kelurahan Pati II",
              "Desa Pati Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pati Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pemalang",
        "districts": [
          {
            "name": "Pemalang Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pemalang I",
              "Kelurahan Pemalang II",
              "Desa Pemalang Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pemalang Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Purbalingga",
        "districts": [
          {
            "name": "Purbalingga Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Purbalingga I",
              "Kelurahan Purbalingga II",
              "Desa Purbalingga Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Purbalingga Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Purworejo",
        "districts": [
          {
            "name": "Purworejo Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Purworejo I",
              "Kelurahan Purworejo II",
              "Desa Purworejo Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Purworejo Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Rembang",
        "districts": [
          {
            "name": "Rembang Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Rembang I",
              "Kelurahan Rembang II",
              "Desa Rembang Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Rembang Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sragen",
        "districts": [
          {
            "name": "Sragen Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sragen I",
              "Kelurahan Sragen II",
              "Desa Sragen Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sragen Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Temanggung",
        "districts": [
          {
            "name": "Temanggung Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Temanggung I",
              "Kelurahan Temanggung II",
              "Desa Temanggung Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Temanggung Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Wonogiri",
        "districts": [
          {
            "name": "Wonogiri Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Wonogiri I",
              "Kelurahan Wonogiri II",
              "Desa Wonogiri Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Wonogiri Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Wonosobo",
        "districts": [
          {
            "name": "Wonosobo Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Wonosobo I",
              "Kelurahan Wonosobo II",
              "Desa Wonosobo Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Wonosobo Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "di-yogyakarta",
    "name": "DI Yogyakarta",
    "cities": [
      {
        "name": "Kota Yogyakarta",
        "districts": [
          {
            "name": "Danurejan",
            "postalCode": "55211",
            "villages": [
              "Bausasran",
              "Suryatmajan",
              "Tegal Panggung"
            ]
          },
          {
            "name": "Gondokusuman",
            "postalCode": "55221",
            "villages": [
              "Baciro",
              "Demangan",
              "Klitren",
              "Kotabaru",
              "Terban"
            ]
          },
          {
            "name": "Malioboro / Gedongtengen",
            "postalCode": "55271",
            "villages": [
              "Pringgokusuman",
              "Sosromenduran"
            ]
          },
          {
            "name": "Kraton",
            "postalCode": "55131",
            "villages": [
              "Kadipaten",
              "Panembahan",
              "Patehan"
            ]
          },
          {
            "name": "Umbulharjo",
            "postalCode": "55161",
            "villages": [
              "Giwangan",
              "Mujamuju",
              "Pandeyan",
              "Semaki",
              "Sorosutan",
              "Tahunan",
              "Warungboto"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sleman",
        "districts": [
          {
            "name": "Depok",
            "postalCode": "55281",
            "villages": [
              "Caturtunggal",
              "Condongcatur",
              "Maguwoharjo"
            ]
          },
          {
            "name": "Mlati",
            "postalCode": "55284",
            "villages": [
              "Sinduadi",
              "Sendangadi",
              "Tirtoadi",
              "Sumberadi",
              "Cebongan"
            ]
          },
          {
            "name": "Ngaglik",
            "postalCode": "55581",
            "villages": [
              "Donoharjo",
              "Minomartani",
              "Sardonoharjo",
              "Sariharjo",
              "Sinduharjo",
              "Sukoharjo"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bantul",
        "districts": [
          {
            "name": "Bantul",
            "postalCode": "55711",
            "villages": [
              "Bantul",
              "Palbapang",
              "Ringinharjo",
              "Sabdodadi",
              "Trirenggo"
            ]
          },
          {
            "name": "Sewon",
            "postalCode": "55187",
            "villages": [
              "Bangunharjo",
              "Panggungharjo",
              "Pendowoharjo",
              "Timbulharjo"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kulon Progo",
        "districts": [
          {
            "name": "Wates",
            "postalCode": "55611",
            "villages": [
              "Bendungan",
              "Giripeni",
              "Karangwuni",
              "Kulwaru",
              "Ngestiharjo",
              "Sogan",
              "Triharjo",
              "Wates"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Gunungkidul",
        "districts": [
          {
            "name": "Wonosari",
            "postalCode": "55811",
            "villages": [
              "Baleharjo",
              "Duwet",
              "Gari",
              "Karangtengah",
              "Kepek",
              "Mulo",
              "Piyaman",
              "Pulutan",
              "Selang",
              "Siraman",
              "Wareng",
              "Wonosari",
              "Wunung"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "jawa-timur",
    "name": "Jawa Timur",
    "cities": [
      {
        "name": "Kota Surabaya",
        "districts": [
          {
            "name": "Genteng",
            "postalCode": "60272",
            "villages": [
              "Embong Kaliasin",
              "Genteng",
              "Kapasari",
              "Ketabang",
              "Peneleh"
            ]
          },
          {
            "name": "Tegalsari",
            "postalCode": "60261",
            "villages": [
              "Dr. Soetomo",
              "Kedungdoro",
              "Keputran",
              "Tegalsari",
              "Wonorejo"
            ]
          },
          {
            "name": "Gubeng",
            "postalCode": "60281",
            "villages": [
              "Airlangga",
              "Barata Jaya",
              "Gubeng",
              "Kertajaya",
              "Mojo",
              "Pucang Sewu"
            ]
          },
          {
            "name": "Wonokromo",
            "postalCode": "60241",
            "villages": [
              "Darmo",
              "Jagir",
              "Ngagel",
              "Ngagelrejo",
              "Sawunggaling",
              "Wonokromo"
            ]
          },
          {
            "name": "Rungkut",
            "postalCode": "60293",
            "villages": [
              "Kali Rungkut",
              "Kedung Baruk",
              "Medokan Ayu",
              "Penjaringansari",
              "Rungkut Kidul",
              "Wonorejo"
            ]
          }
        ]
      },
      {
        "name": "Kota Malang",
        "districts": [
          {
            "name": "Klojen",
            "postalCode": "65111",
            "villages": [
              "Bareng",
              "Gadingasri",
              "Kasir",
              "Kauman",
              "Kiduldalem",
              "Klojen",
              "Oro-oro Dowo",
              "Penanggungan",
              "Rampal Celaket",
              "Samaan",
              "Sukoharjo"
            ]
          },
          {
            "name": "Lowokwaru",
            "postalCode": "65141",
            "villages": [
              "Dinoyo",
              "Jatimulyo",
              "Ketawanggede",
              "Lowokwaru",
              "Merjosari",
              "Mojolangu",
              "Sumbersari",
              "Tasikmadu",
              "Tlogomas",
              "Tulusrejo",
              "Tunggulwulung"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sidoarjo",
        "districts": [
          {
            "name": "Sidoarjo",
            "postalCode": "61211",
            "villages": [
              "Buluhsidokare",
              "Celep",
              "Cemengbakalan",
              "Cemengkalang",
              "Gebyok",
              "Lemahputro",
              "Magersari",
              "Pekauman",
              "Pucang",
              "Pucanganom",
              "Sekardangan",
              "Sidokare",
              "Sidoklumpuk",
              "Sidokumpul",
              "Urangagung"
            ]
          },
          {
            "name": "Waru",
            "postalCode": "61256",
            "villages": [
              "Berbek",
              "Bungurasih",
              "Janti",
              "Kedungrejo",
              "Kepuhkiriman",
              "Kureksari",
              "Medaeng",
              "Ngingas",
              "Pepelegi",
              "Tambak Oso",
              "Tambak Rejo",
              "Tambak Sawah",
              "Tambak Sumur",
              "Tropodo",
              "Wadungasri",
              "Waru"
            ]
          }
        ]
      },
      {
        "name": "Kota Batu",
        "districts": [
          {
            "name": "Batu",
            "postalCode": "65311",
            "villages": [
              "Ngaglik",
              "Oro-oro Ombo",
              "Pesanggrahan",
              "Sidomulyo",
              "Sisir",
              "Songgokerto",
              "Sumberejo",
              "Temas"
            ]
          }
        ]
      },
      {
        "name": "Kota Kediri",
        "districts": [
          {
            "name": "Kota",
            "postalCode": "64121",
            "villages": [
              "Balowerti",
              "Banjaran",
              "Jamsaren",
              "Kampung Dalem",
              "Kemasan",
              "Manisrenggo",
              "Ngadirejo",
              "Pakelan",
              "Pandean",
              "Pocanan",
              "Rejomulyo",
              "Ringinanom",
              "Semampir",
              "Setono Gedong",
              "Setono Pande"
            ]
          }
        ]
      },
      {
        "name": "Kota Madiun",
        "districts": [
          {
            "name": "Kartoharjo",
            "postalCode": "63111",
            "villages": [
              "Kanigoro",
              "Kartoharjo",
              "Klegen",
              "Oro-Oro Ombo",
              "Pilangkenceng",
              "Rejomulyo",
              "Sukosari",
              "Tawangrejo"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Gresik",
        "districts": [
          {
            "name": "Gresik",
            "postalCode": "61111",
            "villages": [
              "Bedilan",
              "Gapurosukolilo",
              "Karangpoh",
              "Kebungson",
              "Kemuteran",
              "Kramatinggil",
              "Lumpur",
              "Ngipik",
              "Pekauman",
              "Pekelingan",
              "Pulopancikan",
              "Sidokumpul",
              "Sukodono",
              "Sukorame",
              "Tlogopatut",
              "Tlogopojok"
            ]
          },
          {
            "name": "Manyar",
            "postalCode": "61151",
            "villages": [
              "Banyuwangi",
              "Karangrejo",
              "Leran",
              "Manyar Sidomukti",
              "Manyar Sidorukun",
              "Manyarejo",
              "Morobakung",
              "Peganden",
              "Pejangganan",
              "Roomo",
              "Sembayat",
              "Suci",
              "Sukomulyo",
              "Tanggulrejo",
              "Tebalo",
              "Yosowilangun"
            ]
          },
          {
            "name": "Kebomas",
            "postalCode": "61121",
            "villages": [
              "Dahanrejo",
              "Giri",
              "Gending",
              "Gulomantung",
              "Indro",
              "Kawisanyar",
              "Kebomas",
              "Kedanyang",
              "Kembangan",
              "Klangonan",
              "Randuagung",
              "Segoromadu",
              "Sidomukti",
              "Singosari",
              "Sukorejo",
              "Tengket"
            ]
          },
          {
            "name": "Driyorejo",
            "postalCode": "61177",
            "villages": [
              "Bambe",
              "Banjaran",
              "Cangkir",
              "Driyorejo",
              "Gadung",
              "Karanglo",
              "Kesamben Wetan",
              "Krikilan",
              "Mojosarirejo",
              "Mulung",
              "Petiken",
              "Randegansari",
              "Sumput",
              "Tanjungan",
              "Tenaru",
              "Wedoroanom"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pasuruan",
        "districts": [
          {
            "name": "Bangil",
            "postalCode": "67153",
            "villages": [
              "Bendoangal",
              "Dermo",
              "Gempeng",
              "Kalirejo",
              "Kauman",
              "Kersikan",
              "Kiduldalem",
              "Kolursari",
              "Latek",
              "Manaruwi",
              "Masangan",
              "Pogar",
              "Raci",
              "Sidowayah",
              "Tambakan"
            ]
          },
          {
            "name": "Pandaan",
            "postalCode": "67156",
            "villages": [
              "Banjarsari",
              "Durensewu",
              "Jogosari",
              "Karangjati",
              "Kebonwaru",
              "Kemirisewu",
              "Kutorejo",
              "Nogosari",
              "Pandaan",
              "Petungasri",
              "Plintahan",
              "Sumbergedang",
              "Sumberrejo",
              "Tawangrejo",
              "Tunggulwulung",
              "Wedoro"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Mojokerto",
        "districts": [
          {
            "name": "Mojosari",
            "postalCode": "61382",
            "villages": [
              "Awang-awang",
              "Belahantengah",
              "Candiwatu",
              "Jotangan",
              "Kebondalem",
              "Kedunggempol",
              "Menanggal",
              "Modopuro",
              "Mojosari",
              "Randubango",
              "Sarirejo",
              "Seduri",
              "Sumbertanggul"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Jember",
        "districts": [
          {
            "name": "Kaliwates",
            "postalCode": "68131",
            "villages": [
              "Jember Kidul",
              "Kaliwates",
              "Kebon Agung",
              "Kepatihan",
              "Mangli",
              "Sempusari",
              "Tegal Besar"
            ]
          },
          {
            "name": "Patrang",
            "postalCode": "68111",
            "villages": [
              "Banjarsari",
              "Baratan",
              "Bintoro",
              "Gebang",
              "Jemberlor",
              "Patrang",
              "Slawu"
            ]
          },
          {
            "name": "Sumbersari",
            "postalCode": "68121",
            "villages": [
              "Antirogo",
              "Karangrejo",
              "Kebonsari",
              "Kranjingan",
              "Sumbersari",
              "Tegalgede",
              "Wirolegi"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Banyuwangi",
        "districts": [
          {
            "name": "Banyuwangi",
            "postalCode": "68411",
            "villages": [
              "Baleharjo",
              "Kampung Mandar",
              "Kampung Melayu",
              "Karangrejo",
              "Kebalenan",
              "Kepatihan",
              "Kertosari",
              "Lateng",
              "Pakis",
              "Panderejo",
              "Penganjuran",
              "Pengantigan",
              "Singonegaran",
              "Singotrunan",
              "Sobo",
              "Sukowidi",
              "Tamanbaru",
              "Temenggungan",
              "Tukangkayu"
            ]
          },
          {
            "name": "Rogojampi",
            "postalCode": "68462",
            "villages": [
              "Aliyan",
              "Gitik",
              "Gladag",
              "Kedaleman",
              "Lemahbangdewo",
              "Pengatigan",
              "Rogojampi"
            ]
          },
          {
            "name": "Genteng",
            "postalCode": "68465",
            "villages": [
              "Genteng Kulon",
              "Genteng Wetan",
              "Kaligondo",
              "Kembiritan",
              "Setail"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bojonegoro",
        "districts": [
          {
            "name": "Bojonegoro",
            "postalCode": "62111",
            "villages": [
              "Banjarejo",
              "Campurejo",
              "Kadipaten",
              "Kauman",
              "Kepatihan",
              "Klangon",
              "Ledok Kulon",
              "Ledok Wetan",
              "Mojokampung",
              "Mulyoagung",
              "Ngrowo",
              "Pacul",
              "Semanding",
              "Sukorejo",
              "Sumbang"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tuban",
        "districts": [
          {
            "name": "Tuban",
            "postalCode": "62311",
            "villages": [
              "Baturetno",
              "Doromukti",
              "Karangsari",
              "Kebonsari",
              "Kingking",
              "Kutorejo",
              "Latsari",
              "Perbon",
              "Ronggomulyo",
              "Sendangharjo",
              "Sidomulyo",
              "Sukolilo"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Lamongan",
        "districts": [
          {
            "name": "Lamongan",
            "postalCode": "62211",
            "villages": [
              "Banjarmendalan",
              "Jetis",
              "Sidoharjo",
              "Sidokumpul",
              "Sukomulyo",
              "Sukorejo",
              "Tlogoanyar",
              "Tumenggungan"
            ]
          }
        ]
      },
      {
        "name": "Kota Pasuruan",
        "districts": [
          {
            "name": "Panggungrejo",
            "postalCode": "67111",
            "villages": [
              "Bangsalsari",
              "Bugul Lor",
              "Kandangsapi",
              "Kebonsari",
              "Mandaranrejo",
              "Mayangan",
              "Ngemplakrejo",
              "Panggungrejo",
              "Pekuncen",
              "Petamanan",
              "Tambaan",
              "Trajeng"
            ]
          },
          {
            "name": "Purworejo",
            "postalCode": "67115",
            "villages": [
              "Kebonagung",
              "Pohjentrek",
              "Purutrejo",
              "Purworejo",
              "Sekargadung",
              "Tembokrejo",
              "Wiroborang"
            ]
          }
        ]
      },
      {
        "name": "Kota Blitar",
        "districts": [
          {
            "name": "Kepanjenkidul",
            "postalCode": "66111",
            "villages": [
              "Bendo",
              "Kauman",
              "Kepanjenkidul",
              "Kepanjenlor",
              "Ngadirejo",
              "Sentul",
              "Tanggung"
            ]
          },
          {
            "name": "Sananwetan",
            "postalCode": "66131",
            "villages": [
              "Bendogerit",
              "Gedog",
              "Karangtengah",
              "Klampok",
              "Plosokerep",
              "Rembang",
              "Sananwetan"
            ]
          }
        ]
      },
      {
        "name": "Kota Probolinggo",
        "districts": [
          {
            "name": "Probolinggo Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Probolinggo I",
              "Kelurahan Probolinggo II",
              "Desa Probolinggo Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Probolinggo Selatan",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bangkalan",
        "districts": [
          {
            "name": "Bangkalan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bangkalan I",
              "Kelurahan Bangkalan II",
              "Desa Bangkalan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bangkalan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bondowoso",
        "districts": [
          {
            "name": "Bondowoso Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bondowoso I",
              "Kelurahan Bondowoso II",
              "Desa Bondowoso Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bondowoso Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Jombang",
        "districts": [
          {
            "name": "Jombang Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Jombang I",
              "Kelurahan Jombang II",
              "Desa Jombang Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Jombang Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Lumajang",
        "districts": [
          {
            "name": "Lumajang Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Lumajang I",
              "Kelurahan Lumajang II",
              "Desa Lumajang Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Lumajang Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Magetan",
        "districts": [
          {
            "name": "Magetan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Magetan I",
              "Kelurahan Magetan II",
              "Desa Magetan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Magetan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Nganjuk",
        "districts": [
          {
            "name": "Nganjuk Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Nganjuk I",
              "Kelurahan Nganjuk II",
              "Desa Nganjuk Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Nganjuk Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Ngawi",
        "districts": [
          {
            "name": "Ngawi Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Ngawi I",
              "Kelurahan Ngawi II",
              "Desa Ngawi Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Ngawi Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pacitan",
        "districts": [
          {
            "name": "Pacitan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pacitan I",
              "Kelurahan Pacitan II",
              "Desa Pacitan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pacitan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pamekasan",
        "districts": [
          {
            "name": "Pamekasan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pamekasan I",
              "Kelurahan Pamekasan II",
              "Desa Pamekasan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pamekasan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Ponorogo",
        "districts": [
          {
            "name": "Ponorogo Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Ponorogo I",
              "Kelurahan Ponorogo II",
              "Desa Ponorogo Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Ponorogo Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sampang",
        "districts": [
          {
            "name": "Sampang Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sampang I",
              "Kelurahan Sampang II",
              "Desa Sampang Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sampang Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Situbondo",
        "districts": [
          {
            "name": "Situbondo Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Situbondo I",
              "Kelurahan Situbondo II",
              "Desa Situbondo Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Situbondo Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sumenep",
        "districts": [
          {
            "name": "Sumenep Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sumenep I",
              "Kelurahan Sumenep II",
              "Desa Sumenep Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sumenep Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Trenggalek",
        "districts": [
          {
            "name": "Trenggalek Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Trenggalek I",
              "Kelurahan Trenggalek II",
              "Desa Trenggalek Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Trenggalek Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tulungagung",
        "districts": [
          {
            "name": "Tulungagung Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tulungagung I",
              "Kelurahan Tulungagung II",
              "Desa Tulungagung Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tulungagung Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "aceh",
    "name": "Aceh",
    "cities": [
      {
        "name": "Kota Banda Aceh",
        "districts": [
          {
            "name": "Baiturrahman",
            "postalCode": "23241",
            "villages": [
              "Ateuk Jawo",
              "Ateuk Pahlawan",
              "Kampung Baru",
              "Neusu Jaya",
              "Peuniti",
              "Seutui",
              "Sukaramai"
            ]
          },
          {
            "name": "Kuta Alam",
            "postalCode": "23121",
            "villages": [
              "Bandar Baru",
              "Beurawe",
              "Keuramat",
              "Kuta Alam",
              "Laksana",
              "Lampulo",
              "Mulio"
            ]
          },
          {
            "name": "Syiah Kuala",
            "postalCode": "23111",
            "villages": [
              "Alue Naga",
              "Deah Raya",
              "Ie Masen Kaye Adang",
              "Jeulingke",
              "Kopelma Darussalam",
              "Lambaro Skep",
              "Lamgugob",
              "Peurada",
              "Pineung",
              "Tibang"
            ]
          }
        ]
      },
      {
        "name": "Kota Sabang",
        "districts": [
          {
            "name": "Sukakarya",
            "postalCode": "23511",
            "villages": [
              "Aneuk Laot",
              "Krueng Raya",
              "Kuta Ateuh",
              "Kuta Barat",
              "Kuta Timu"
            ]
          }
        ]
      },
      {
        "name": "Kota Lhokseumawe",
        "districts": [
          {
            "name": "Banda Sakti",
            "postalCode": "24311",
            "villages": [
              "Hagu Barat Laut",
              "Hagu Selatan",
              "Hagu Teungoh",
              "Java",
              "Keude Aceh",
              "Kuta Blang",
              "Lancang Garam",
              "Mon Geudong",
              "Pusong Baru",
              "Pusong Lhok",
              "Simpang Empat",
              "Tumpok Teungoh",
              "Ujong Blang"
            ]
          }
        ]
      },
      {
        "name": "Kota Langsa",
        "districts": [
          {
            "name": "Langsa Kota",
            "postalCode": "24411",
            "villages": [
              "Alue Beurawe",
              "Alue Dua",
              "Blang",
              "Blang Seunibong",
              "Daulat",
              "Gampong Jawa",
              "Gampong Teungoh",
              "Meutia",
              "Paya Bujok Blang Pase",
              "Peukan Langsa",
              "Tualang Teungoh"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Aceh Besar",
        "districts": [
          {
            "name": "Darul Imarah",
            "postalCode": "23352",
            "villages": [
              "Bayu",
              "Denong",
              "Garot",
              "Gue Gajah",
              "Kandang",
              "Lam Bheu",
              "Lam Cot",
              "Lam Kawee",
              "Lampeuneurut Gampong",
              "Lampeuneurut Ujong Blang",
              "Lamsiteh",
              "Leu",
              "Pasi Beutong",
              "Punang",
              "Ulee Lueng"
            ]
          }
        ]
      },
      {
        "name": "Kota Subulussalam",
        "districts": [
          {
            "name": "Subulussalam Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Subulussalam I",
              "Kelurahan Subulussalam II",
              "Desa Subulussalam Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Subulussalam Selatan",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pidie",
        "districts": [
          {
            "name": "Pidie Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pidie I",
              "Kelurahan Pidie II",
              "Desa Pidie Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pidie Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bireuen",
        "districts": [
          {
            "name": "Bireuen Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bireuen I",
              "Kelurahan Bireuen II",
              "Desa Bireuen Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bireuen Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Aceh Utara",
        "districts": [
          {
            "name": "Aceh Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Aceh Utara I",
              "Kelurahan Aceh Utara II",
              "Desa Aceh Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Aceh Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Aceh Timur",
        "districts": [
          {
            "name": "Aceh Timur Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Aceh Timur I",
              "Kelurahan Aceh Timur II",
              "Desa Aceh Timur Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Aceh Timur Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Aceh Tengah",
        "districts": [
          {
            "name": "Aceh Tengah Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Aceh Tengah I",
              "Kelurahan Aceh Tengah II",
              "Desa Aceh Tengah Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Aceh Tengah Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Aceh Barat",
        "districts": [
          {
            "name": "Aceh Barat Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Aceh Barat I",
              "Kelurahan Aceh Barat II",
              "Desa Aceh Barat Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Aceh Barat Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Aceh Selatan",
        "districts": [
          {
            "name": "Aceh Selatan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Aceh Selatan I",
              "Kelurahan Aceh Selatan II",
              "Desa Aceh Selatan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Aceh Selatan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Aceh Singkil",
        "districts": [
          {
            "name": "Aceh Singkil Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Aceh Singkil I",
              "Kelurahan Aceh Singkil II",
              "Desa Aceh Singkil Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Aceh Singkil Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Simeulue",
        "districts": [
          {
            "name": "Simeulue Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Simeulue I",
              "Kelurahan Simeulue II",
              "Desa Simeulue Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Simeulue Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bener Meriah",
        "districts": [
          {
            "name": "Bener Meriah Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bener Meriah I",
              "Kelurahan Bener Meriah II",
              "Desa Bener Meriah Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bener Meriah Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Gayo Lues",
        "districts": [
          {
            "name": "Gayo Lues Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Gayo Lues I",
              "Kelurahan Gayo Lues II",
              "Desa Gayo Lues Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Gayo Lues Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Nagan Raya",
        "districts": [
          {
            "name": "Nagan Raya Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Nagan Raya I",
              "Kelurahan Nagan Raya II",
              "Desa Nagan Raya Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Nagan Raya Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Aceh Jaya",
        "districts": [
          {
            "name": "Aceh Jaya Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Aceh Jaya I",
              "Kelurahan Aceh Jaya II",
              "Desa Aceh Jaya Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Aceh Jaya Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Aceh Barat Daya",
        "districts": [
          {
            "name": "Aceh Barat Daya Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Aceh Barat Daya I",
              "Kelurahan Aceh Barat Daya II",
              "Desa Aceh Barat Daya Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Aceh Barat Daya Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Aceh Tamiang",
        "districts": [
          {
            "name": "Aceh Tamiang Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Aceh Tamiang I",
              "Kelurahan Aceh Tamiang II",
              "Desa Aceh Tamiang Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Aceh Tamiang Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pidie Jaya",
        "districts": [
          {
            "name": "Pidie Jaya Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pidie Jaya I",
              "Kelurahan Pidie Jaya II",
              "Desa Pidie Jaya Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pidie Jaya Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Aceh Tenggara",
        "districts": [
          {
            "name": "Aceh Tenggara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Aceh Tenggara I",
              "Kelurahan Aceh Tenggara II",
              "Desa Aceh Tenggara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Aceh Tenggara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "sumatera-utara",
    "name": "Sumatera Utara",
    "cities": [
      {
        "name": "Kota Medan",
        "districts": [
          {
            "name": "Medan Kota",
            "postalCode": "20211",
            "villages": [
              "Kotamatsum III",
              "Mesjid",
              "Pasar Baru",
              "Pasar Merah Barat",
              "Pusat Pasar",
              "Sei Rengas I",
              "Sitirejo I",
              "Teladan Barat",
              "Teladan Timur"
            ]
          },
          {
            "name": "Medan Baru",
            "postalCode": "20153",
            "villages": [
              "Babura",
              "Darai",
              "Merdeka",
              "Padang Bulan",
              "Petisah Hulu",
              "Titi Rantai"
            ]
          },
          {
            "name": "Medan Petisah",
            "postalCode": "20111",
            "villages": [
              "Petisah Tengah",
              "Sekip",
              "Sei Putih Barat",
              "Sei Putih Tengah",
              "Sei Putih Timur I",
              "Sei Putih Timur II",
              "Silalas"
            ]
          },
          {
            "name": "Medan Selayang",
            "postalCode": "20131",
            "villages": [
              "Asam Kumbang",
              "Beringin",
              "Padang Bulan Selayang I",
              "Padang Bulan Selayang II",
              "Sempakata",
              "Tanjung Sari"
            ]
          }
        ]
      },
      {
        "name": "Kota Pematangsiantar",
        "districts": [
          {
            "name": "Siantar Barat",
            "postalCode": "21111",
            "villages": [
              "Bantan",
              "Banjar",
              "Dwikora",
              "Proklamasi",
              "Simarito",
              "Sipinggol-pinggol",
              "Teladan",
              "Timbang Galung"
            ]
          }
        ]
      },
      {
        "name": "Kota Binjai",
        "districts": [
          {
            "name": "Binjai Kota",
            "postalCode": "20711",
            "villages": [
              "Berngam",
              "Binjai",
              "Kartini",
              "Pekan Binjai",
              "Satria",
              "Setia",
              "Tangsi"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Deli Serdang",
        "districts": [
          {
            "name": "Lubuk Pakam",
            "postalCode": "20511",
            "villages": [
              "Cempa",
              "Lubuk Pakam I-II",
              "Lubuk Pakam III",
              "Lubuk Pakam Pekan",
              "Paluh Kemiri",
              "Petapahan",
              "Sekip",
              "Syahmad",
              "Tanjung Garbus I"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Karo",
        "districts": [
          {
            "name": "Kabanjahe",
            "postalCode": "22111",
            "villages": [
              "Gung Leto",
              "Gung Negeri",
              "Kaban",
              "Kabanjahe",
              "Ketaren",
              "Lau Cimba",
              "Padang Mas",
              "Pekan Kabanjahe",
              "Samura",
              "Sumber Mufakat"
            ]
          }
        ]
      },
      {
        "name": "Kota Tebing Tinggi",
        "districts": [
          {
            "name": "Tebing Tinggi Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tebing Tinggi I",
              "Kelurahan Tebing Tinggi II",
              "Desa Tebing Tinggi Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tebing Tinggi Selatan",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kota Tanjungbalai",
        "districts": [
          {
            "name": "Tanjungbalai Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tanjungbalai I",
              "Kelurahan Tanjungbalai II",
              "Desa Tanjungbalai Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tanjungbalai Selatan",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kota Sibolga",
        "districts": [
          {
            "name": "Sibolga Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sibolga I",
              "Kelurahan Sibolga II",
              "Desa Sibolga Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sibolga Selatan",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kota Padangsidimpuan",
        "districts": [
          {
            "name": "Padangsidimpuan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Padangsidimpuan I",
              "Kelurahan Padangsidimpuan II",
              "Desa Padangsidimpuan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Padangsidimpuan Selatan",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kota Gunungsitoli",
        "districts": [
          {
            "name": "Gunungsitoli Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Gunungsitoli I",
              "Kelurahan Gunungsitoli II",
              "Desa Gunungsitoli Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Gunungsitoli Selatan",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Langkat",
        "districts": [
          {
            "name": "Langkat Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Langkat I",
              "Kelurahan Langkat II",
              "Desa Langkat Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Langkat Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Simalungun",
        "districts": [
          {
            "name": "Simalungun Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Simalungun I",
              "Kelurahan Simalungun II",
              "Desa Simalungun Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Simalungun Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Asahan",
        "districts": [
          {
            "name": "Asahan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Asahan I",
              "Kelurahan Asahan II",
              "Desa Asahan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Asahan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Labuhanbatu",
        "districts": [
          {
            "name": "Labuhanbatu Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Labuhanbatu I",
              "Kelurahan Labuhanbatu II",
              "Desa Labuhanbatu Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Labuhanbatu Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tapanuli Utara",
        "districts": [
          {
            "name": "Tapanuli Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tapanuli Utara I",
              "Kelurahan Tapanuli Utara II",
              "Desa Tapanuli Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tapanuli Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tapanuli Tengah",
        "districts": [
          {
            "name": "Tapanuli Tengah Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tapanuli Tengah I",
              "Kelurahan Tapanuli Tengah II",
              "Desa Tapanuli Tengah Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tapanuli Tengah Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tapanuli Selatan",
        "districts": [
          {
            "name": "Tapanuli Selatan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tapanuli Selatan I",
              "Kelurahan Tapanuli Selatan II",
              "Desa Tapanuli Selatan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tapanuli Selatan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Toba",
        "districts": [
          {
            "name": "Toba Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Toba I",
              "Kelurahan Toba II",
              "Desa Toba Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Toba Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Mandailing Natal",
        "districts": [
          {
            "name": "Mandailing Natal Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Mandailing Natal I",
              "Kelurahan Mandailing Natal II",
              "Desa Mandailing Natal Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Mandailing Natal Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Nias",
        "districts": [
          {
            "name": "Nias Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Nias I",
              "Kelurahan Nias II",
              "Desa Nias Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Nias Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Nias Selatan",
        "districts": [
          {
            "name": "Nias Selatan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Nias Selatan I",
              "Kelurahan Nias Selatan II",
              "Desa Nias Selatan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Nias Selatan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Dairi",
        "districts": [
          {
            "name": "Dairi Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Dairi I",
              "Kelurahan Dairi II",
              "Desa Dairi Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Dairi Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Humbang Hasundutan",
        "districts": [
          {
            "name": "Humbang Hasundutan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Humbang Hasundutan I",
              "Kelurahan Humbang Hasundutan II",
              "Desa Humbang Hasundutan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Humbang Hasundutan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Samosir",
        "districts": [
          {
            "name": "Samosir Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Samosir I",
              "Kelurahan Samosir II",
              "Desa Samosir Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Samosir Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Serdang Bedagai",
        "districts": [
          {
            "name": "Serdang Bedagai Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Serdang Bedagai I",
              "Kelurahan Serdang Bedagai II",
              "Desa Serdang Bedagai Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Serdang Bedagai Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Batu Bara",
        "districts": [
          {
            "name": "Batu Bara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Batu Bara I",
              "Kelurahan Batu Bara II",
              "Desa Batu Bara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Batu Bara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Padang Lawas",
        "districts": [
          {
            "name": "Padang Lawas Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Padang Lawas I",
              "Kelurahan Padang Lawas II",
              "Desa Padang Lawas Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Padang Lawas Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Padang Lawas Utara",
        "districts": [
          {
            "name": "Padang Lawas Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Padang Lawas Utara I",
              "Kelurahan Padang Lawas Utara II",
              "Desa Padang Lawas Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Padang Lawas Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Labuhanbatu Selatan",
        "districts": [
          {
            "name": "Labuhanbatu Selatan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Labuhanbatu Selatan I",
              "Kelurahan Labuhanbatu Selatan II",
              "Desa Labuhanbatu Selatan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Labuhanbatu Selatan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Labuhanbatu Utara",
        "districts": [
          {
            "name": "Labuhanbatu Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Labuhanbatu Utara I",
              "Kelurahan Labuhanbatu Utara II",
              "Desa Labuhanbatu Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Labuhanbatu Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Nias Utara",
        "districts": [
          {
            "name": "Nias Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Nias Utara I",
              "Kelurahan Nias Utara II",
              "Desa Nias Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Nias Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Nias Barat",
        "districts": [
          {
            "name": "Nias Barat Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Nias Barat I",
              "Kelurahan Nias Barat II",
              "Desa Nias Barat Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Nias Barat Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pakpak Bharat",
        "districts": [
          {
            "name": "Pakpak Bharat Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pakpak Bharat I",
              "Kelurahan Pakpak Bharat II",
              "Desa Pakpak Bharat Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pakpak Bharat Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "sumatera-barat",
    "name": "Sumatera Barat",
    "cities": [
      {
        "name": "Kota Padang",
        "districts": [
          {
            "name": "Padang Barat",
            "postalCode": "25111",
            "villages": [
              "Belakang Tangsi",
              "Berok Nipah",
              "Flamboyan Baru",
              "Kampung Jao",
              "Kampung Pondok",
              "Olo",
              "Padang Pasir",
              "Purus",
              "Rimbo Kaluang",
              "Ujung Gurun"
            ]
          },
          {
            "name": "Padang Timur",
            "postalCode": "25121",
            "villages": [
              "Andalas",
              "Ganting Parak Gadang",
              "Jati",
              "Jati Baru",
              "Kubu Marapalam",
              "Kubu Parak Karakah",
              "Marapalam",
              "Parak Gadang Timur",
              "Sawahan",
              "Sawahan Timur",
              "Simpang Haru"
            ]
          },
          {
            "name": "Padang Utara",
            "postalCode": "25131",
            "villages": [
              "Air Tawar Barat",
              "Air Tawar Timur",
              "Alai Parak Kopi",
              "Gunung Pangilun",
              "Lolong Belanti",
              "Ulak Karang Selatan",
              "Ulak Karang Utara"
            ]
          },
          {
            "name": "Padang Selatan",
            "postalCode": "25141",
            "villages": [
              "Air Manis",
              "Alang Laweh",
              "Batang Arau",
              "Belakang Pondok",
              "Bukit Gado-Gado",
              "Mata Air",
              "Pasa Gadang",
              "Ranah Parak Rumbio",
              "Rawang",
              "Seberang Padang",
              "Seberang Palinggam",
              "Teluk Bayur"
            ]
          },
          {
            "name": "Koto Tangah",
            "postalCode": "25171",
            "villages": [
              "Air Pacah",
              "Balai Gadang",
              "Batang Kabung Ganting",
              "Bungo Pasang",
              "Dadok Tunggul Hitam",
              "Koto Panjang Ikur Koto",
              "Koto Pulai",
              "Lubuk Buaya",
              "Lubuk Minturun",
              "Padang Sarai",
              "Pasir Nan Tigo"
            ]
          },
          {
            "name": "Kuranji",
            "postalCode": "25151",
            "villages": [
              "Ampang",
              "Anduring",
              "Gunung Sarik",
              "Kalumbuk",
              "Korong Gadang",
              "Kuranji",
              "Lubuk Lintah",
              "Pasar Ambacang",
              "Sungai Sapih"
            ]
          }
        ]
      },
      {
        "name": "Kota Bukittinggi",
        "districts": [
          {
            "name": "Guguk Panjang",
            "postalCode": "26111",
            "villages": [
              "Benteng Pasar Atas",
              "Bukit Cangang Kayu Ramang",
              "Kayu Kubu",
              "Pakansari",
              "Tarok Dipo"
            ]
          },
          {
            "name": "Mandiangin Koto Selayan",
            "postalCode": "26121",
            "villages": [
              "Campago Guguk Bulek",
              "Campago Ipuh",
              "Koto Selayan",
              "Kubu Gulai Bancah",
              "Mandiangin",
              "Pulai Anak Air"
            ]
          },
          {
            "name": "Aur Birugo Tigo Baleh",
            "postalCode": "26131",
            "villages": [
              "Aur Kuning",
              "Belakang Balok",
              "Birugo",
              "Kubu Tanjung",
              "Ladang Cakiah",
              "Pakan Labuah",
              "Parit Antang",
              "Sapiran"
            ]
          }
        ]
      },
      {
        "name": "Kota Payakumbuh",
        "districts": [
          {
            "name": "Payakumbuh Barat",
            "postalCode": "26211",
            "villages": [
              "Bulakan Balai Kandi",
              "Dayan",
              "Ibuh",
              "Kubu Gadang",
              "Labuh Baru",
              "Napar",
              "Padang Datar Tanah Mati",
              "Pakan Sinayan",
              "Parit Rantang",
              "Payolansek",
              "Subarang Batuang",
              "Talang",
              "Tanah Situruk"
            ]
          },
          {
            "name": "Payakumbuh Utara",
            "postalCode": "26221",
            "villages": [
              "Balai Baru",
              "Balai Kaliki",
              "Balai Tongah Koto",
              "Koto Baru Balai Janggo",
              "Koto Panjang Dalam",
              "Koto Panjang Padang",
              "Muaro",
              "Ompang Tanah Sirah",
              "Taratak Padang Kampuang"
            ]
          },
          {
            "name": "Payakumbuh Timur",
            "postalCode": "26231",
            "villages": [
              "Balai Jaring",
              "Padang Alai Bodi",
              "Padang Tangah Payobadar",
              "Padang Tiakar",
              "Pueh Rambatan",
              "Tiakar"
            ]
          },
          {
            "name": "Payakumbuh Selatan",
            "postalCode": "26241",
            "villages": [
              "Balai Panjang",
              "Kapalo Koto Ampangan",
              "Koto Tua",
              "Limbukan",
              "Padang Karambia",
              "Sawahpadang Aur Kuning"
            ]
          },
          {
            "name": "Lamposi Tigo Nagori",
            "postalCode": "26251",
            "villages": [
              "Koto Panjang",
              "Padang Sikabu",
              "Parambahan",
              "Parik Muko Aie",
              "Sungai Durian"
            ]
          }
        ]
      },
      {
        "name": "Kota Pariaman",
        "districts": [
          {
            "name": "Pariaman Tengah",
            "postalCode": "25511",
            "villages": [
              "Alai Gelombang",
              "Cimparambang",
              "Jawi-Jawi I",
              "Jawi-Jawi II",
              "Kampung Baru",
              "Kampung Jawa I",
              "Kampung Jawa II",
              "Kampung Perak",
              "Kampung Pondok",
              "Karan Aur",
              "Lohan",
              "Pasir",
              "Pondok II",
              "Rawang",
              "Tarattak"
            ]
          },
          {
            "name": "Pariaman Utara",
            "postalCode": "25521",
            "villages": [
              "Ampalu",
              "Apar",
              "Balai Naras",
              "Cubadak Mentawai",
              "Manggung",
              "Naras I",
              "Naras Hilir",
              "Padang Birik-Birik",
              "Sikapak Barat",
              "Sikapak Timur",
              "Sungai Rambai",
              "Tanjung Sabar"
            ]
          },
          {
            "name": "Pariaman Selatan",
            "postalCode": "25531",
            "villages": [
              "Balai Kurai Taji",
              "Batang Kabung",
              "Kampung Apar",
              "Marunggi",
              "Padang Cakur",
              "Pauh Barat",
              "Pauh Timur",
              "Punggung Lading",
              "Rambai",
              "Simpang Koto Baringin",
              "Sungai Kasai",
              "Taluk"
            ]
          },
          {
            "name": "Pariaman Timur",
            "postalCode": "25541",
            "villages": [
              "Air Santok",
              "Batang Tajongkek",
              "Batu Gadang",
              "Bungotanjung",
              "Campago",
              "Koto Marapak",
              "Koto Kaciak",
              "Pakasai",
              "Sungai Pasak",
              "Sungai Sirah",
              "Talago Sariak"
            ]
          }
        ]
      },
      {
        "name": "Kota Solok",
        "districts": [
          {
            "name": "Lubuk Sikarah",
            "postalCode": "27311",
            "villages": [
              "Aromako",
              "IX Korong",
              "Kampaung Jawa",
              "Koto Panjang",
              "Simpang Rumbio",
              "Sinapa Piliang",
              "Tanah Garam"
            ]
          },
          {
            "name": "Tanjung Harapan",
            "postalCode": "27321",
            "villages": [
              "Kampung Barat",
              "Koto Hilalang",
              "Laing",
              "Nan Balimo",
              "Pasar Pandan Air Mati",
              "Tanjung Paku"
            ]
          }
        ]
      },
      {
        "name": "Kota Sawahlunto",
        "districts": [
          {
            "name": "Lembah Segar",
            "postalCode": "27411",
            "villages": [
              "Air Dingin",
              "Aur Mulyo",
              "Kubang Tangah",
              "Pasar",
              "Saringan",
              "Tanah Lapang"
            ]
          },
          {
            "name": "Barangin",
            "postalCode": "27421",
            "villages": [
              "Kolok Mudik",
              "Kolok Nan Tuo",
              "Lumindai",
              "Santur",
              "Sitalang",
              "Talago Gunung"
            ]
          },
          {
            "name": "Silungkang",
            "postalCode": "27431",
            "villages": [
              "Muaro Kalaban",
              "Silungkang Duo",
              "Silungkang Oso",
              "Silungkang Tigo",
              "Taratak Bonjo"
            ]
          },
          {
            "name": "Talawi",
            "postalCode": "27441",
            "villages": [
              "Batu Tanjung",
              "Kandih",
              "Kumbayau",
              "Rantih",
              "Salak",
              "Sijantang Koto",
              "Talawi Hilie",
              "Talawi Mudik"
            ]
          }
        ]
      },
      {
        "name": "Kota Padang Panjang",
        "districts": [
          {
            "name": "Padang Panjang Barat",
            "postalCode": "27111",
            "villages": [
              "Balai-Balai",
              "Bukit Surungan",
              "Kampung Manggis",
              "Pasar Baru",
              "Pasar Usang",
              "Silaing Atas",
              "Silaing Bawah",
              "Tanah Hitam"
            ]
          },
          {
            "name": "Padang Panjang Timur",
            "postalCode": "27121",
            "villages": [
              "Ekor Lubuk",
              "Ganting",
              "Guguk Malintang",
              "Koto Katik",
              "Koto Panjang",
              "Ngalau",
              "Sigando",
              "Tanah Pak Lambik"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Agam",
        "districts": [
          {
            "name": "Lubuk Basung",
            "postalCode": "26411",
            "villages": [
              "Kampung Pinang",
              "Kampung Tangah",
              "Lubuk Basung",
              "Manggopoh",
              "Sungai Jariang"
            ]
          },
          {
            "name": "Banuhampu",
            "postalCode": "26181",
            "villages": [
              "Cingkariang",
              "Kubang Putiah",
              "Ladang Laweh",
              "Padang Lua",
              "Pakan Sinayan",
              "Sungai Tanang",
              "Taluak IV Suku"
            ]
          },
          {
            "name": "IV Koto",
            "postalCode": "26182",
            "villages": [
              "Balingka",
              "Guguak Tabek Sarojo",
              "Koto Gadang",
              "Koto Panjang",
              "Koto Tuo",
              "Sianok Anam Suku",
              "Sungai Landia"
            ]
          },
          {
            "name": "Tilatang Kamang",
            "postalCode": "26152",
            "villages": [
              "Gadut",
              "Kapau",
              "Koto Tangah"
            ]
          },
          {
            "name": "Tanjung Raya (Maninjau)",
            "postalCode": "26471",
            "villages": [
              "Bayur",
              "Duo Koto",
              "Koto Gadang",
              "Koto Kaciak",
              "Koto Malintang",
              "Maninjau",
              "Sungai Batang",
              "Tanjung Sani"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Lima Puluh Kota",
        "districts": [
          {
            "name": "Harau",
            "postalCode": "26271",
            "villages": [
              "Batu Balang",
              "Bukik Limbuku",
              "Gurukan",
              "Harau",
              "Koto Tuo",
              "Lubuk Batingkok",
              "Pilubang",
              "Sarilamak",
              "Solok Bio Bio",
              "Taram",
              "Tarantang"
            ]
          },
          {
            "name": "Payakumbuh",
            "postalCode": "26251",
            "villages": [
              "Koto Baru Simalanggang",
              "Koto Tangah",
              "Piobang",
              "Simalanggang",
              "Sungai Beringin",
              "Taeh Baruah",
              "Taeh Bukik"
            ]
          },
          {
            "name": "Luak",
            "postalCode": "26261",
            "villages": [
              "Andaleh",
              "Mungka",
              "Sikabu-kabu",
              "Sungai Kamuyang",
              "Tanjung Haro"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Padang Pariaman",
        "districts": [
          {
            "name": "Nan Sabaris",
            "postalCode": "25571",
            "villages": [
              "Kapalo Koto",
              "Kuraitaji",
              "Padang Bintungan",
              "Pauh Kambar",
              "Sunur"
            ]
          },
          {
            "name": "Batang Anai",
            "postalCode": "25586",
            "villages": [
              "Buayan Lubuk Alung",
              "Katapiang",
              "Kasang",
              "Sungai Buluh",
              "Sungai Buluh Barat",
              "Sungai Buluh Selatan",
              "Sungai Buluh Timur"
            ]
          },
          {
            "name": "Lubuk Alung",
            "postalCode": "25584",
            "villages": [
              "Aie Tajun",
              "Lubuk Alung",
              "Pasie Laweh",
              "Pungguang Kasiak",
              "Salibutan",
              "Sikabu",
              "Singguling",
              "Sungai Abang"
            ]
          },
          {
            "name": "2x11 Enam Lingkung",
            "postalCode": "25583",
            "villages": [
              "Lubuk Pandan",
              "Pakandangan",
              "Parit Malintang",
              "Sicincin",
              "Toboh Gadang"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pesisir Selatan",
        "districts": [
          {
            "name": "IV Jurai (Painan)",
            "postalCode": "25611",
            "villages": [
              "Bungo Pasang Salido",
              "Lumpo",
              "Painan",
              "Painan Selatan",
              "Painan Timur",
              "Salido",
              "Sago Salido"
            ]
          },
          {
            "name": "Batang Kapas",
            "postalCode": "25661",
            "villages": [
              "IV Koto Mudiek",
              "Koto Nan Duo",
              "Koto Nan Tigo IV Koto Hilie",
              "Taluak Tigo Sakato"
            ]
          },
          {
            "name": "Lengayang",
            "postalCode": "25663",
            "villages": [
              "Kambang",
              "Kambang Barat",
              "Kambang Timur",
              "Lakitan",
              "Lakitan Selatan",
              "Lakitan Tengah",
              "Lakitan Timur",
              "Lakitan Utara"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tanah Datar",
        "districts": [
          {
            "name": "Lima Kaum (Batusangkar)",
            "postalCode": "27211",
            "villages": [
              "Baringin",
              "Cubadak",
              "Labuh",
              "Limo Kaum",
              "Parambahan"
            ]
          },
          {
            "name": "Sungayang",
            "postalCode": "27292",
            "villages": [
              "Andaleh Baruh Bukik",
              "Minangkabau",
              "Sungai Patai",
              "Sungayang",
              "Tanjung"
            ]
          },
          {
            "name": "Pariangan",
            "postalCode": "27264",
            "villages": [
              "Batu Basa",
              "Pariangan",
              "Sawah Tangah",
              "Simabur",
              "Tabek"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pasaman",
        "districts": [
          {
            "name": "Lubuk Sikaping",
            "postalCode": "26311",
            "villages": [
              "Aia Manggih",
              "Durian Tinggi",
              "Gagang Barat",
              "Jambak",
              "Pauh",
              "Sundata",
              "Tanjung Baringin"
            ]
          },
          {
            "name": "Bonjol",
            "postalCode": "26381",
            "villages": [
              "Ganggo Hilia",
              "Ganggo Mudiak",
              "Koto Kaciak",
              "Limo Koto"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pasaman Barat",
        "districts": [
          {
            "name": "Pasaman (Simpang Empat)",
            "postalCode": "26566",
            "villages": [
              "Aia Gadang",
              "Aua Kuniang",
              "Lingkuang Aua",
              "Sukamenanti"
            ]
          },
          {
            "name": "Kinali",
            "postalCode": "26567",
            "villages": [
              "Kinali",
              "Koto Baru",
              "Mandiangin"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Solok",
        "districts": [
          {
            "name": "Gunung Talang (Arosuka)",
            "postalCode": "27365",
            "villages": [
              "Aie Batumbuak",
              "Batang Barus",
              "Cupak",
              "Jawi-Jawi",
              "Koto Gaek Guguak",
              "Koto Gadang Guguak",
              "Sungai Janiah",
              "Talang"
            ]
          },
          {
            "name": "Kubung",
            "postalCode": "27361",
            "villages": [
              "Gauang",
              "Koto Baru",
              "Koto Hilalang",
              "Panyakalan",
              "Saok Laweh",
              "Selayo",
              "Tanjung Bingkung"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Solok Selatan",
        "districts": [
          {
            "name": "Sangir (Padang Aro)",
            "postalCode": "27778",
            "villages": [
              "Lubuk Gadang",
              "Lubuk Gadang Barat",
              "Lubuk Gadang Selatan",
              "Lubuk Gadang Timur"
            ]
          },
          {
            "name": "Sungai Pagu (Muara Labuh)",
            "postalCode": "27776",
            "villages": [
              "Koto Baru",
              "Pasar Muara Labuh",
              "Pasir Talang",
              "Pasir Talang Barat",
              "Pasir Talang Selatan",
              "Pasir Talang Timur",
              "Sako Pasir Talang"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Dharmasraya",
        "districts": [
          {
            "name": "Pulau Punjung",
            "postalCode": "27611",
            "villages": [
              "Empat Koto Pulau Punjung",
              "Gunung Selasih",
              "Sikabau",
              "Sungai Dareh",
              "Sungai Kambut",
              "Tebing Tinggi"
            ]
          },
          {
            "name": "Koto Baru",
            "postalCode": "27681",
            "villages": [
              "Ampang Kuranji",
              "Koto Baru",
              "Koto Padang",
              "Sialang Gaung"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sijunjung",
        "districts": [
          {
            "name": "Sijunjung",
            "postalCode": "27511",
            "villages": [
              "Aie Angek",
              "Durian Gadang",
              "Kandang Baru",
              "Muaro",
              "Paru",
              "Pematang Panjang",
              "Sijunjung",
              "Silokek"
            ]
          },
          {
            "name": "Kamang Baru",
            "postalCode": "27572",
            "villages": [
              "Aie Amo",
              "Kamang",
              "Koto Baru",
              "Kunangan Parit Rantang",
              "Lubuk Tarantang",
              "Maloro",
              "Muaro Takuak",
              "Padang Tarok",
              "Siaur",
              "Sungai Lansek",
              "Tanjung Kaliang"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kepulauan Mentawai",
        "districts": [
          {
            "name": "Sipora Utara (Tuapejat)",
            "postalCode": "25392",
            "villages": [
              "Betumonga",
              "Goisooinan",
              "Sido Makmur",
              "Sipora Jaya",
              "Tuapejat",
              "Walet Simalegi"
            ]
          },
          {
            "name": "Siberut Selatan (Muara Siberut)",
            "postalCode": "25393",
            "villages": [
              "Madobag",
              "Matotonan",
              "Muntei",
              "Muara Siberut",
              "Rokdok"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "riau",
    "name": "Riau",
    "cities": [
      {
        "name": "Kota Pekanbaru",
        "districts": [
          {
            "name": "Pekanbaru Kota",
            "postalCode": "28111",
            "villages": [
              "Kota Baru",
              "Kota Tinggi",
              "Sukaramai",
              "Sumahilang",
              "Tanah Datar",
              "Simpang Empat"
            ]
          },
          {
            "name": "Marpoyan Damai",
            "postalCode": "28282",
            "villages": [
              "Maharatu",
              "Perhentian Marpoyan",
              "Sidomulyo Timur",
              "Tangkerang Barat",
              "Tangkerang Tengah",
              "Wonorejo"
            ]
          },
          {
            "name": "Tampan / Tuah Madani",
            "postalCode": "28291",
            "villages": [
              "Delima",
              "Sidomulyo Barat",
              "Simpang Baru",
              "Tobek Godang",
              "Tuah Karya",
              "Tuah Madani"
            ]
          }
        ]
      },
      {
        "name": "Kota Dumai",
        "districts": [
          {
            "name": "Dumai Kota",
            "postalCode": "28811",
            "villages": [
              "Bintan",
              "Dumai Kota",
              "Laksamana",
              "Rimba Sekampung",
              "Sukajadi"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kampar (Bangkinang)",
        "districts": [
          {
            "name": "Bangkinang Kota",
            "postalCode": "28411",
            "villages": [
              "Bangkinang",
              "Kumantan",
              "Langgin",
              "Pasir Sialang",
              "Ridan Permai"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kampar",
        "districts": [
          {
            "name": "Kampar Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kampar I",
              "Kelurahan Kampar II",
              "Desa Kampar Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kampar Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Siak",
        "districts": [
          {
            "name": "Siak Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Siak I",
              "Kelurahan Siak II",
              "Desa Siak Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Siak Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bengkalis",
        "districts": [
          {
            "name": "Bengkalis Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bengkalis I",
              "Kelurahan Bengkalis II",
              "Desa Bengkalis Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bengkalis Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Indragiri Hilir",
        "districts": [
          {
            "name": "Indragiri Hilir Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Indragiri Hilir I",
              "Kelurahan Indragiri Hilir II",
              "Desa Indragiri Hilir Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Indragiri Hilir Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Indragiri Hulu",
        "districts": [
          {
            "name": "Indragiri Hulu Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Indragiri Hulu I",
              "Kelurahan Indragiri Hulu II",
              "Desa Indragiri Hulu Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Indragiri Hulu Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pelalawan",
        "districts": [
          {
            "name": "Pelalawan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pelalawan I",
              "Kelurahan Pelalawan II",
              "Desa Pelalawan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pelalawan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Rokan Hilir",
        "districts": [
          {
            "name": "Rokan Hilir Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Rokan Hilir I",
              "Kelurahan Rokan Hilir II",
              "Desa Rokan Hilir Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Rokan Hilir Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Rokan Hulu",
        "districts": [
          {
            "name": "Rokan Hulu Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Rokan Hulu I",
              "Kelurahan Rokan Hulu II",
              "Desa Rokan Hulu Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Rokan Hulu Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kuantan Singingi",
        "districts": [
          {
            "name": "Kuantan Singingi Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kuantan Singingi I",
              "Kelurahan Kuantan Singingi II",
              "Desa Kuantan Singingi Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kuantan Singingi Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kepulauan Meranti",
        "districts": [
          {
            "name": "Kepulauan Meranti Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kepulauan Meranti I",
              "Kelurahan Kepulauan Meranti II",
              "Desa Kepulauan Meranti Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kepulauan Meranti Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "kepulauan-riau",
    "name": "Kepulauan Riau",
    "cities": [
      {
        "name": "Kota Batam",
        "districts": [
          {
            "name": "Batam Kota",
            "postalCode": "29461",
            "villages": [
              "Baloi Permai",
              "Belian",
              "Sukajadi",
              "Sungai Panas",
              "Taman Baloi",
              "Teluk Tering"
            ]
          },
          {
            "name": "Lubuk Baja (Nagoya)",
            "postalCode": "29444",
            "villages": [
              "Baloi Indah",
              "Batu Selicin",
              "Kampung Pelita",
              "Lubuk Baja Kota",
              "Tanjung Uma"
            ]
          }
        ]
      },
      {
        "name": "Kota Tanjungpinang",
        "districts": [
          {
            "name": "Tanjungpinang Kota",
            "postalCode": "29111",
            "villages": [
              "Kampung Bugis",
              "Penyengat",
              "Senggarang",
              "Tanjungpinang Kota"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bintan",
        "districts": [
          {
            "name": "Bintan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bintan I",
              "Kelurahan Bintan II",
              "Desa Bintan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bintan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Karimun",
        "districts": [
          {
            "name": "Karimun Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Karimun I",
              "Kelurahan Karimun II",
              "Desa Karimun Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Karimun Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Natuna",
        "districts": [
          {
            "name": "Natuna Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Natuna I",
              "Kelurahan Natuna II",
              "Desa Natuna Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Natuna Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Lingga",
        "districts": [
          {
            "name": "Lingga Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Lingga I",
              "Kelurahan Lingga II",
              "Desa Lingga Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Lingga Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kepulauan Anambas",
        "districts": [
          {
            "name": "Kepulauan Anambas Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kepulauan Anambas I",
              "Kelurahan Kepulauan Anambas II",
              "Desa Kepulauan Anambas Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kepulauan Anambas Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "jambi",
    "name": "Jambi",
    "cities": [
      {
        "name": "Kota Jambi",
        "districts": [
          {
            "name": "Telanaipura",
            "postalCode": "36122",
            "villages": [
              "Buluran Kenali",
              "Pematang Sulur",
              "Simpang Empat Sipin",
              "Telanaipura",
              "Teluk Kenali"
            ]
          },
          {
            "name": "Pasar Jambi",
            "postalCode": "36111",
            "villages": [
              "Beringin",
              "Market",
              "Orang Kayo Hitam",
              "Sungai Asam"
            ]
          },
          {
            "name": "Danau Sipin",
            "postalCode": "36121",
            "villages": [
              "Legok",
              "Murni",
              "Selamat",
              "Solok Sipin",
              "Sungai Putri"
            ]
          },
          {
            "name": "Jelutung",
            "postalCode": "36136",
            "villages": [
              "Cempaka Putih",
              "Handil Jaya",
              "Jelutung",
              "Kebun Handil",
              "Lebak Bandung",
              "Payo Lebar",
              "Talang Jauh"
            ]
          },
          {
            "name": "Kotabaru",
            "postalCode": "36128",
            "villages": [
              "Kenali Asam Atas",
              "Kenali Asam Bawah",
              "Paal Lima",
              "Simpang Tiga Sipin",
              "Sukakarya"
            ]
          },
          {
            "name": "Alam Barajo",
            "postalCode": "36126",
            "villages": [
              "Bagan Pete",
              "Beliung",
              "Kenali Besar",
              "Mayang Mangurai",
              "Rawasari"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Muaro Jambi",
        "districts": [
          {
            "name": "Jaluko (Jambi Luar Kota)",
            "postalCode": "36361",
            "villages": [
              "Pijoan",
              "Mendalo Darat",
              "Mendalo Laut",
              "Simpang Sungai Duren",
              "Sungai Duren",
              "Rengas Bandung",
              "Senaung"
            ]
          },
          {
            "name": "Sekernan",
            "postalCode": "36381",
            "villages": [
              "Sengeti",
              "Berembang",
              "Gerunggung",
              "Kedemangan",
              "Sekernan",
              "Suak Putat",
              "Tanjung Lanjut"
            ]
          }
        ]
      },
      {
        "name": "Kota Sungai Penuh",
        "districts": [
          {
            "name": "Sungai Penuh",
            "postalCode": "37111",
            "villages": [
              "Pasar Sungai Penuh",
              "Sungai Penuh",
              "Lawang Agung",
              "Pondok Tinggi",
              "Koto Renah"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Batanghari",
        "districts": [
          {
            "name": "Batanghari Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Batanghari I",
              "Kelurahan Batanghari II",
              "Desa Batanghari Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Batanghari Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bungo",
        "districts": [
          {
            "name": "Bungo Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bungo I",
              "Kelurahan Bungo II",
              "Desa Bungo Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bungo Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kerinci",
        "districts": [
          {
            "name": "Kerinci Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kerinci I",
              "Kelurahan Kerinci II",
              "Desa Kerinci Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kerinci Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Merangin",
        "districts": [
          {
            "name": "Merangin Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Merangin I",
              "Kelurahan Merangin II",
              "Desa Merangin Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Merangin Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sarolangun",
        "districts": [
          {
            "name": "Sarolangun Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sarolangun I",
              "Kelurahan Sarolangun II",
              "Desa Sarolangun Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sarolangun Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tanjung Jabung Barat",
        "districts": [
          {
            "name": "Tanjung Jabung Barat Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tanjung Jabung Barat I",
              "Kelurahan Tanjung Jabung Barat II",
              "Desa Tanjung Jabung Barat Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tanjung Jabung Barat Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tanjung Jabung Timur",
        "districts": [
          {
            "name": "Tanjung Jabung Timur Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tanjung Jabung Timur I",
              "Kelurahan Tanjung Jabung Timur II",
              "Desa Tanjung Jabung Timur Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tanjung Jabung Timur Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tebo",
        "districts": [
          {
            "name": "Tebo Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tebo I",
              "Kelurahan Tebo II",
              "Desa Tebo Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tebo Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "sumatera-selatan",
    "name": "Sumatera Selatan",
    "cities": [
      {
        "name": "Kota Palembang",
        "districts": [
          {
            "name": "Ilir Timur I",
            "postalCode": "30121",
            "villages": [
              "13 Ilir",
              "14 Ilir",
              "15 Ilir",
              "16 Ilir",
              "17 Ilir",
              "18 Ilir",
              "20 Ilir D-I",
              "Kepandean",
              "Sungai Pangeran"
            ]
          },
          {
            "name": "Ilir Barat I",
            "postalCode": "30139",
            "villages": [
              "26 Ilir D-I",
              "Bukit Lama",
              "Bukit Baru",
              "Demang Lebar Daun",
              "Lorok Pakjo",
              "Siring Agung"
            ]
          },
          {
            "name": "Sukarami",
            "postalCode": "30151",
            "villages": [
              "Kebun Bunga",
              "Suka Bangun",
              "Sukarami",
              "Talang Betutu",
              "Talang Jambe"
            ]
          },
          {
            "name": "Kemuning",
            "postalCode": "30127",
            "villages": [
              "20 Ilir II",
              "Ario Kemuning",
              "Pahoman",
              "Pahlawan",
              "Pipa Reja",
              "Sekip Jaya",
              "Talang Aman"
            ]
          },
          {
            "name": "Seberang Ulu I",
            "postalCode": "30252",
            "villages": [
              "1 Ulu",
              "2 Ulu",
              "3-4 Ulu",
              "5 Ulu",
              "7 Ulu",
              "Silaberanti",
              "Tuan Kentang"
            ]
          },
          {
            "name": "Plaju",
            "postalCode": "30268",
            "villages": [
              "Bagus Kuning",
              "Komperta",
              "Plaju Darat",
              "Plaju Ilir",
              "Plaju Ulu",
              "Talang Bubuk",
              "Talang Putri"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Banyuasin",
        "districts": [
          {
            "name": "Talang Kelapa",
            "postalCode": "30961",
            "villages": [
              "Air Batu",
              "Alang-Alang Lebar",
              "Kenten",
              "Sukajadi",
              "Talang Buluh",
              "Talang Kelapa",
              "Tanah Mas"
            ]
          },
          {
            "name": "Banyuasin III (Pangkalan Balai)",
            "postalCode": "30911",
            "villages": [
              "Pangkalan Balai",
              "Kedondong Raye",
              "Mulya Agung",
              "Seterio",
              "Kayuara Kuning"
            ]
          }
        ]
      },
      {
        "name": "Kota Lubuklinggau",
        "districts": [
          {
            "name": "Lubuklinggau Timur I",
            "postalCode": "31625",
            "villages": [
              "Karya Bakti",
              "Majapahit",
              "Taba Jemekeh",
              "Taba Koji",
              "Watervang"
            ]
          }
        ]
      },
      {
        "name": "Kota Prabumulih",
        "districts": [
          {
            "name": "Prabumulih Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Prabumulih I",
              "Kelurahan Prabumulih II",
              "Desa Prabumulih Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Prabumulih Selatan",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kota Pagar Alam",
        "districts": [
          {
            "name": "Pagar Alam Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pagar Alam I",
              "Kelurahan Pagar Alam II",
              "Desa Pagar Alam Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pagar Alam Selatan",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Empat Lawang",
        "districts": [
          {
            "name": "Empat Lawang Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Empat Lawang I",
              "Kelurahan Empat Lawang II",
              "Desa Empat Lawang Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Empat Lawang Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Lahat",
        "districts": [
          {
            "name": "Lahat Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Lahat I",
              "Kelurahan Lahat II",
              "Desa Lahat Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Lahat Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Muara Enim",
        "districts": [
          {
            "name": "Muara Enim Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Muara Enim I",
              "Kelurahan Muara Enim II",
              "Desa Muara Enim Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Muara Enim Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Musi Banyuasin",
        "districts": [
          {
            "name": "Musi Banyuasin Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Musi Banyuasin I",
              "Kelurahan Musi Banyuasin II",
              "Desa Musi Banyuasin Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Musi Banyuasin Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Musi Rawas",
        "districts": [
          {
            "name": "Musi Rawas Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Musi Rawas I",
              "Kelurahan Musi Rawas II",
              "Desa Musi Rawas Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Musi Rawas Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Musi Rawas Utara",
        "districts": [
          {
            "name": "Musi Rawas Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Musi Rawas Utara I",
              "Kelurahan Musi Rawas Utara II",
              "Desa Musi Rawas Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Musi Rawas Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Ogan Ilir",
        "districts": [
          {
            "name": "Ogan Ilir Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Ogan Ilir I",
              "Kelurahan Ogan Ilir II",
              "Desa Ogan Ilir Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Ogan Ilir Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Ogan Komering Ilir",
        "districts": [
          {
            "name": "Ogan Komering Ilir Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Ogan Komering Ilir I",
              "Kelurahan Ogan Komering Ilir II",
              "Desa Ogan Komering Ilir Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Ogan Komering Ilir Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Ogan Komering Ulu",
        "districts": [
          {
            "name": "Ogan Komering Ulu Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Ogan Komering Ulu I",
              "Kelurahan Ogan Komering Ulu II",
              "Desa Ogan Komering Ulu Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Ogan Komering Ulu Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten OKU Selatan",
        "districts": [
          {
            "name": "OKU Selatan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan OKU Selatan I",
              "Kelurahan OKU Selatan II",
              "Desa OKU Selatan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "OKU Selatan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten OKU Timur",
        "districts": [
          {
            "name": "OKU Timur Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan OKU Timur I",
              "Kelurahan OKU Timur II",
              "Desa OKU Timur Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "OKU Timur Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Penukal Abab Lematang Ilir",
        "districts": [
          {
            "name": "Penukal Abab Lematang Ilir Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Penukal Abab Lematang Ilir I",
              "Kelurahan Penukal Abab Lematang Ilir II",
              "Desa Penukal Abab Lematang Ilir Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Penukal Abab Lematang Ilir Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bengkulu",
    "name": "Bengkulu",
    "cities": [
      {
        "name": "Kota Bengkulu",
        "districts": [
          {
            "name": "Ratu Samban",
            "postalCode": "38221",
            "villages": [
              "Anggut Atas",
              "Anggut Bawah",
              "Anggut Dalam",
              "Belakang Pondok",
              "Kebun Dahri",
              "Kebun Geran",
              "Padang Jati",
              "Pengantungan",
              "Penurunan"
            ]
          },
          {
            "name": "Gading Cempaka",
            "postalCode": "38229",
            "villages": [
              "Cempaka Permai",
              "Jalan Gedang",
              "Lingkar Barat",
              "Padang Harapan",
              "Sido Mulyo"
            ]
          },
          {
            "name": "Teluk Segara",
            "postalCode": "38114",
            "villages": [
              "Bajak",
              "Berkas",
              "Kampung Bali",
              "Kebun Keling",
              "Kebun Ros",
              "Malabero",
              "Pasar Baru",
              "Pasar Melintang",
              "Pintu Batu",
              "Pondok Besi",
              "Sumur Melele",
              "Tengah Padang"
            ]
          },
          {
            "name": "Muara Bangka Hulu",
            "postalCode": "38125",
            "villages": [
              "Beringin Raya",
              "Kandang Limun",
              "Pematang Gubernur",
              "Rawa Makmur",
              "Rawa Makmur Permai"
            ]
          },
          {
            "name": "Selebar",
            "postalCode": "38211",
            "villages": [
              "Bumi Ayu",
              "Betungan",
              "Pagar Dewa",
              "Pekan Sabtu",
              "Sukami",
              "Sumur Dewa"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Rejang Lebong",
        "districts": [
          {
            "name": "Curup",
            "postalCode": "39111",
            "villages": [
              "Adirejo",
              "Air Putih Lama",
              "Dwi Tunggal",
              "Jalan Baru",
              "Pasar Baru",
              "Pasar Curup",
              "Talang Benih"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bengkulu Selatan",
        "districts": [
          {
            "name": "Bengkulu Selatan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bengkulu Selatan I",
              "Kelurahan Bengkulu Selatan II",
              "Desa Bengkulu Selatan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bengkulu Selatan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bengkulu Tengah",
        "districts": [
          {
            "name": "Bengkulu Tengah Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bengkulu Tengah I",
              "Kelurahan Bengkulu Tengah II",
              "Desa Bengkulu Tengah Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bengkulu Tengah Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bengkulu Utara",
        "districts": [
          {
            "name": "Bengkulu Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bengkulu Utara I",
              "Kelurahan Bengkulu Utara II",
              "Desa Bengkulu Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bengkulu Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kaur",
        "districts": [
          {
            "name": "Kaur Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kaur I",
              "Kelurahan Kaur II",
              "Desa Kaur Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kaur Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kepahiang",
        "districts": [
          {
            "name": "Kepahiang Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kepahiang I",
              "Kelurahan Kepahiang II",
              "Desa Kepahiang Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kepahiang Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Lebong",
        "districts": [
          {
            "name": "Lebong Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Lebong I",
              "Kelurahan Lebong II",
              "Desa Lebong Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Lebong Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Mukomuko",
        "districts": [
          {
            "name": "Mukomuko Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Mukomuko I",
              "Kelurahan Mukomuko II",
              "Desa Mukomuko Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Mukomuko Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Seluma",
        "districts": [
          {
            "name": "Seluma Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Seluma I",
              "Kelurahan Seluma II",
              "Desa Seluma Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Seluma Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "lampung",
    "name": "Lampung",
    "cities": [
      {
        "name": "Kota Bandar Lampung",
        "districts": [
          {
            "name": "Tanjung Karang Pusat",
            "postalCode": "35111",
            "villages": [
              "Durian Payung",
              "Gotong Royong",
              "Kaliawi",
              "Kaliawi Persada",
              "Kelapa Tiga",
              "Palapa",
              "Pasir Gintung"
            ]
          },
          {
            "name": "Tanjung Karang Timur",
            "postalCode": "35121",
            "villages": [
              "Kebon Jeruk",
              "Kota Baru",
              "Sawah Brebes",
              "Sawah Lama",
              "Tanjung Agung"
            ]
          },
          {
            "name": "Kedaton",
            "postalCode": "35141",
            "villages": [
              "Kedaton",
              "Penengahan",
              "Penengahan Raya",
              "Sukamenanti",
              "Sukamenanti Baru",
              "Surabaya",
              "Tegalsari"
            ]
          },
          {
            "name": "Rajabasa",
            "postalCode": "35144",
            "villages": [
              "Gedong Meneng",
              "Gedong Meneng Baru",
              "Rajabasa",
              "Rajabasa Jaya",
              "Rajabasa Pemuka",
              "Rajabasa Raya"
            ]
          },
          {
            "name": "Teluk Betung Selatan",
            "postalCode": "35221",
            "villages": [
              "Gedong Pakuon",
              "Gunung Mas",
              "Pesawahan",
              "Talang",
              "Teluk Betung"
            ]
          },
          {
            "name": "Kemiling",
            "postalCode": "35153",
            "villages": [
              "Beringin Jaya",
              "Beringin Raya",
              "Kedaung",
              "Kemiling Permai",
              "Pinang Jaya",
              "Sumber Agung",
              "Sumber Rejo"
            ]
          },
          {
            "name": "Sukarame",
            "postalCode": "35131",
            "villages": [
              "Korpri Jaya",
              "Korpri Raya",
              "Sukarame",
              "Sukarame Baru",
              "Way Dadi",
              "Way Dadi Baru"
            ]
          }
        ]
      },
      {
        "name": "Kota Metro",
        "districts": [
          {
            "name": "Metro Pusat",
            "postalCode": "34111",
            "villages": [
              "Hadimulyo Barat",
              "Hadimulyo Timur",
              "Imopuro",
              "Metro",
              "Yosomulyo"
            ]
          },
          {
            "name": "Metro Timur",
            "postalCode": "34112",
            "villages": [
              "Iringmulyo",
              "Tejoagung",
              "Tejosari",
              "Yosodadi",
              "Yosorejo"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Lampung Selatan",
        "districts": [
          {
            "name": "Natar",
            "postalCode": "35362",
            "villages": [
              "Bumi Sari",
              "Candi Mas",
              "Hajimena",
              "Kalisari",
              "Merak Batin",
              "Muara Putih",
              "Natar",
              "Negararatu",
              "Rejosari",
              "Sidosari",
              "Sukadamai",
              "Tanjung Sari"
            ]
          },
          {
            "name": "Kalianda",
            "postalCode": "35551",
            "villages": [
              "Bumi Agung",
              "Canggu",
              "Kedaton",
              "Kalianda",
              "Palembapang",
              "Way Urang"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Lampung Barat",
        "districts": [
          {
            "name": "Lampung Barat Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Lampung Barat I",
              "Kelurahan Lampung Barat II",
              "Desa Lampung Barat Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Lampung Barat Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Lampung Tengah",
        "districts": [
          {
            "name": "Lampung Tengah Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Lampung Tengah I",
              "Kelurahan Lampung Tengah II",
              "Desa Lampung Tengah Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Lampung Tengah Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Lampung Timur",
        "districts": [
          {
            "name": "Lampung Timur Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Lampung Timur I",
              "Kelurahan Lampung Timur II",
              "Desa Lampung Timur Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Lampung Timur Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Lampung Utara",
        "districts": [
          {
            "name": "Lampung Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Lampung Utara I",
              "Kelurahan Lampung Utara II",
              "Desa Lampung Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Lampung Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Mesuji",
        "districts": [
          {
            "name": "Mesuji Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Mesuji I",
              "Kelurahan Mesuji II",
              "Desa Mesuji Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Mesuji Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pesawaran",
        "districts": [
          {
            "name": "Pesawaran Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pesawaran I",
              "Kelurahan Pesawaran II",
              "Desa Pesawaran Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pesawaran Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pesisir Barat",
        "districts": [
          {
            "name": "Pesisir Barat Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pesisir Barat I",
              "Kelurahan Pesisir Barat II",
              "Desa Pesisir Barat Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pesisir Barat Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pringsewu",
        "districts": [
          {
            "name": "Pringsewu Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pringsewu I",
              "Kelurahan Pringsewu II",
              "Desa Pringsewu Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pringsewu Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tanggamus",
        "districts": [
          {
            "name": "Tanggamus Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tanggamus I",
              "Kelurahan Tanggamus II",
              "Desa Tanggamus Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tanggamus Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tulang Bawang",
        "districts": [
          {
            "name": "Tulang Bawang Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tulang Bawang I",
              "Kelurahan Tulang Bawang II",
              "Desa Tulang Bawang Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tulang Bawang Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tulang Bawang Barat",
        "districts": [
          {
            "name": "Tulang Bawang Barat Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tulang Bawang Barat I",
              "Kelurahan Tulang Bawang Barat II",
              "Desa Tulang Bawang Barat Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tulang Bawang Barat Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Way Kanan",
        "districts": [
          {
            "name": "Way Kanan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Way Kanan I",
              "Kelurahan Way Kanan II",
              "Desa Way Kanan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Way Kanan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bangka-belitung",
    "name": "Kepulauan Bangka Belitung",
    "cities": [
      {
        "name": "Kota Pangkalpinang",
        "districts": [
          {
            "name": "Taman Sari",
            "postalCode": "33121",
            "villages": [
              "Batin Tikal",
              "Gedung Nasional",
              "Kejaksaan",
              "Opas Indah",
              "Rawa Bangun"
            ]
          },
          {
            "name": "Bukit Intan",
            "postalCode": "33146",
            "villages": [
              "Air Itam",
              "Air Mawar",
              "Bacang",
              "Pasir Putih",
              "Semabung Lama",
              "Sinar Bulan"
            ]
          },
          {
            "name": "Gerunggang",
            "postalCode": "33123",
            "villages": [
              "Air Kepala Tujuh",
              "Bukit Merapin",
              "Bukit Sari",
              "Kacang Pedang",
              "Tua Tunu Indah"
            ]
          },
          {
            "name": "Pangkal Balam",
            "postalCode": "33111",
            "villages": [
              "Ampui",
              "Ketapang",
              "Lontong Pancur",
              "Pasir Garam",
              "Rejosari"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bangka",
        "districts": [
          {
            "name": "Sungailiat",
            "postalCode": "33211",
            "villages": [
              "Bukit Betung",
              "Kenanga",
              "Kudai",
              "Matras",
              "Parit Padang",
              "Rebo",
              "Sinar Baru",
              "Srimenanti",
              "Sungailiat",
              "Surya Timur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Belitung",
        "districts": [
          {
            "name": "Tanjung Pandan",
            "postalCode": "33411",
            "villages": [
              "Air Saga",
              "Buluh Tumbang",
              "Kampung Damai",
              "Lesung Batang",
              "Paal Satu",
              "Pangkal Lalang",
              "Parit",
              "Tanjung Pendam"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bangka Barat",
        "districts": [
          {
            "name": "Bangka Barat Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bangka Barat I",
              "Kelurahan Bangka Barat II",
              "Desa Bangka Barat Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bangka Barat Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bangka Selatan",
        "districts": [
          {
            "name": "Bangka Selatan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bangka Selatan I",
              "Kelurahan Bangka Selatan II",
              "Desa Bangka Selatan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bangka Selatan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bangka Tengah",
        "districts": [
          {
            "name": "Bangka Tengah Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bangka Tengah I",
              "Kelurahan Bangka Tengah II",
              "Desa Bangka Tengah Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bangka Tengah Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Belitung Timur",
        "districts": [
          {
            "name": "Belitung Timur Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Belitung Timur I",
              "Kelurahan Belitung Timur II",
              "Desa Belitung Timur Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Belitung Timur Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "kalimantan-barat",
    "name": "Kalimantan Barat",
    "cities": [
      {
        "name": "Kota Pontianak",
        "districts": [
          {
            "name": "Pontianak Kota",
            "postalCode": "78111",
            "villages": [
              "Darat Sekip",
              "Mariana",
              "St. Antonius",
              "St. Ignatius",
              "Tengah"
            ]
          },
          {
            "name": "Pontianak Selatan",
            "postalCode": "78121",
            "villages": [
              "Akcaya",
              "Benua Melayu Darat",
              "Benua Melayu Laut",
              "Kota Baru",
              "Parit Tokaya"
            ]
          },
          {
            "name": "Pontianak Barat",
            "postalCode": "78115",
            "villages": [
              "Pal Lima",
              "Sungai Beliung",
              "Sungai Jawi Dalam",
              "Sungai Jawi Luar"
            ]
          },
          {
            "name": "Pontianak Utara",
            "postalCode": "78241",
            "villages": [
              "Batu Layang",
              "Siantan Hilir",
              "Siantan Hulu",
              "Siantan Tengah"
            ]
          },
          {
            "name": "Pontianak Tenggara",
            "postalCode": "78124",
            "villages": [
              "Bangka Belitung Darat",
              "Bangka Belitung Laut",
              "Bansir Darat",
              "Bansir Laut"
            ]
          }
        ]
      },
      {
        "name": "Kota Singkawang",
        "districts": [
          {
            "name": "Singkawang Barat",
            "postalCode": "79123",
            "villages": [
              "Kuala",
              "Melayu",
              "Pasiran",
              "Tengah"
            ]
          },
          {
            "name": "Singkawang Tengah",
            "postalCode": "79111",
            "villages": [
              "Condong",
              "Jawa",
              "Roban",
              "Sekip Lama",
              "Sungai Wie",
              "Roban"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kubu Raya",
        "districts": [
          {
            "name": "Sungai Raya",
            "postalCode": "78391",
            "villages": [
              "Arang Limbung",
              "Kuala Dua",
              "Limbung",
              "Parit Baru",
              "Sungai Raya",
              "Sungai Raya Dalam",
              "Teluk Kapuas"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bengkayang",
        "districts": [
          {
            "name": "Bengkayang Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bengkayang I",
              "Kelurahan Bengkayang II",
              "Desa Bengkayang Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bengkayang Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kapuas Hulu",
        "districts": [
          {
            "name": "Kapuas Hulu Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kapuas Hulu I",
              "Kelurahan Kapuas Hulu II",
              "Desa Kapuas Hulu Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kapuas Hulu Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kayong Utara",
        "districts": [
          {
            "name": "Kayong Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kayong Utara I",
              "Kelurahan Kayong Utara II",
              "Desa Kayong Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kayong Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Ketapang",
        "districts": [
          {
            "name": "Ketapang Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Ketapang I",
              "Kelurahan Ketapang II",
              "Desa Ketapang Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Ketapang Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Landak",
        "districts": [
          {
            "name": "Landak Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Landak I",
              "Kelurahan Landak II",
              "Desa Landak Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Landak Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Melawi",
        "districts": [
          {
            "name": "Melawi Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Melawi I",
              "Kelurahan Melawi II",
              "Desa Melawi Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Melawi Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Mempawah",
        "districts": [
          {
            "name": "Mempawah Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Mempawah I",
              "Kelurahan Mempawah II",
              "Desa Mempawah Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Mempawah Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sambas",
        "districts": [
          {
            "name": "Sambas Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sambas I",
              "Kelurahan Sambas II",
              "Desa Sambas Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sambas Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sanggau",
        "districts": [
          {
            "name": "Sanggau Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sanggau I",
              "Kelurahan Sanggau II",
              "Desa Sanggau Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sanggau Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sekadau",
        "districts": [
          {
            "name": "Sekadau Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sekadau I",
              "Kelurahan Sekadau II",
              "Desa Sekadau Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sekadau Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sintang",
        "districts": [
          {
            "name": "Sintang Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sintang I",
              "Kelurahan Sintang II",
              "Desa Sintang Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sintang Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "kalimantan-tengah",
    "name": "Kalimantan Tengah",
    "cities": [
      {
        "name": "Kota Palangka Raya",
        "districts": [
          {
            "name": "Pahandut",
            "postalCode": "73111",
            "villages": [
              "Langhai",
              "Pahandut",
              "Pahandut Seberang",
              "Panarung",
              "Tanjung Pinang",
              "Tumbang Rungan"
            ]
          },
          {
            "name": "Jekan Raya",
            "postalCode": "73112",
            "villages": [
              "Bukit Tunggal",
              "Menteng",
              "Palangka",
              "Petuk Katimpun"
            ]
          },
          {
            "name": "Bukit Batu",
            "postalCode": "73221",
            "villages": [
              "Banturung",
              "Habaring Hurung",
              "Marang",
              "Sei Gohong",
              "Tangkiling",
              "Tumbang Tahai"
            ]
          },
          {
            "name": "Sabangau",
            "postalCode": "73113",
            "villages": [
              "Bereng Bengkel",
              "Kalampangan",
              "Kameloh Baru",
              "Kereng Bangkirai",
              "Sabaru"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kotawaringin Barat",
        "districts": [
          {
            "name": "Arut Selatan (Pangkalan Bun)",
            "postalCode": "74111",
            "villages": [
              "Baru",
              "Madurejo",
              "Mendawai",
              "Mendawai Seberang",
              "Pasir Panjang",
              "Raja",
              "Raja Seberang",
              "Sidorejo"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kotawaringin Timur",
        "districts": [
          {
            "name": "Mentawa Baru Ketapang (Sampit)",
            "postalCode": "74322",
            "villages": [
              "Ketapang",
              "Mentawa Baru Hilir",
              "Mentawa Baru Hulu",
              "Pasir Putih",
              "Sawahan"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Barito Selatan",
        "districts": [
          {
            "name": "Barito Selatan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Barito Selatan I",
              "Kelurahan Barito Selatan II",
              "Desa Barito Selatan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Barito Selatan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Barito Timur",
        "districts": [
          {
            "name": "Barito Timur Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Barito Timur I",
              "Kelurahan Barito Timur II",
              "Desa Barito Timur Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Barito Timur Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Barito Utara",
        "districts": [
          {
            "name": "Barito Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Barito Utara I",
              "Kelurahan Barito Utara II",
              "Desa Barito Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Barito Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Gunung Mas",
        "districts": [
          {
            "name": "Gunung Mas Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Gunung Mas I",
              "Kelurahan Gunung Mas II",
              "Desa Gunung Mas Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Gunung Mas Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kapuas",
        "districts": [
          {
            "name": "Kapuas Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kapuas I",
              "Kelurahan Kapuas II",
              "Desa Kapuas Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kapuas Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Katingan",
        "districts": [
          {
            "name": "Katingan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Katingan I",
              "Kelurahan Katingan II",
              "Desa Katingan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Katingan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Lamandau",
        "districts": [
          {
            "name": "Lamandau Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Lamandau I",
              "Kelurahan Lamandau II",
              "Desa Lamandau Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Lamandau Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Murung Raya",
        "districts": [
          {
            "name": "Murung Raya Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Murung Raya I",
              "Kelurahan Murung Raya II",
              "Desa Murung Raya Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Murung Raya Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pulang Pisau",
        "districts": [
          {
            "name": "Pulang Pisau Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pulang Pisau I",
              "Kelurahan Pulang Pisau II",
              "Desa Pulang Pisau Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pulang Pisau Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sukamara",
        "districts": [
          {
            "name": "Sukamara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sukamara I",
              "Kelurahan Sukamara II",
              "Desa Sukamara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sukamara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Seruyan",
        "districts": [
          {
            "name": "Seruyan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Seruyan I",
              "Kelurahan Seruyan II",
              "Desa Seruyan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Seruyan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "kalimantan-selatan",
    "name": "Kalimantan Selatan",
    "cities": [
      {
        "name": "Kota Banjarmasin",
        "districts": [
          {
            "name": "Banjarmasin Tengah",
            "postalCode": "70111",
            "villages": [
              "Antasan Besar",
              "Gadang",
              "Kertak Baru Ilir",
              "Kertak Baru Ulu",
              "Mawar",
              "Melayu",
              "Pasar Lama",
              "Pekapuran Laut",
              "Seberang Mesjid",
              "Sungai Baru",
              "Teluk Dalam"
            ]
          },
          {
            "name": "Banjarmasin Barat",
            "postalCode": "70114",
            "villages": [
              "Belitung Selatan",
              "Belitung Utara",
              "Kuin Cerucuk",
              "Kuin Selatan",
              "Pelambuan",
              "Telaga Biru",
              "Teluk Tiram"
            ]
          },
          {
            "name": "Banjarmasin Timur",
            "postalCode": "70231",
            "villages": [
              "Benua Anyar",
              "Karang Mekar",
              "Kebun Bunga",
              "Kuripan",
              "Pekapuran Raya",
              "Pengambangan",
              "Sungai Bilu",
              "Sungai Lulut"
            ]
          },
          {
            "name": "Banjarmasin Utara",
            "postalCode": "70123",
            "villages": [
              "Alalak Selatan",
              "Alalak Tengah",
              "Alalak Utara",
              "Antasan Kecil Timur",
              "Kuin Utara",
              "Pangeran",
              "Sungai Andai",
              "Sungai Miai",
              "Surian"
            ]
          },
          {
            "name": "Banjarmasin Selatan",
            "postalCode": "70241",
            "villages": [
              "Basirih",
              "Kelayan Barat",
              "Kelayan Dalam",
              "Kelayan Tengah",
              "Kelayan Timur",
              "Mantuil",
              "Murung Raya",
              "Pemurus Baru",
              "Pemurus Dalam",
              "Tanjung Pagar"
            ]
          }
        ]
      },
      {
        "name": "Kota Banjarbaru",
        "districts": [
          {
            "name": "Banjarbaru Utara",
            "postalCode": "70711",
            "villages": [
              "Komet",
              "Loktabat Utara",
              "Mentaos",
              "Sungai Ulin"
            ]
          },
          {
            "name": "Banjarbaru Selatan",
            "postalCode": "70712",
            "villages": [
              "Guntung Paikat",
              "Kemuning",
              "Loktabat Selatan",
              "Sungai Besar"
            ]
          },
          {
            "name": "Landasan Ulin",
            "postalCode": "70721",
            "villages": [
              "Guntung Manggis",
              "Guntung Payung",
              "Landasan Ulin Barat",
              "Landasan Ulin Timur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Banjar",
        "districts": [
          {
            "name": "Martapura",
            "postalCode": "70611",
            "villages": [
              "Cindai Alus",
              "Jawa",
              "Keraton",
              "Murung Kenanga",
              "Pasayangan",
              "Sekumpul",
              "Sungai Paring",
              "Tanjung Rema"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Balangan",
        "districts": [
          {
            "name": "Balangan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Balangan I",
              "Kelurahan Balangan II",
              "Desa Balangan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Balangan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Barito Kuala",
        "districts": [
          {
            "name": "Barito Kuala Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Barito Kuala I",
              "Kelurahan Barito Kuala II",
              "Desa Barito Kuala Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Barito Kuala Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Hulu Sungai Selatan",
        "districts": [
          {
            "name": "Hulu Sungai Selatan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Hulu Sungai Selatan I",
              "Kelurahan Hulu Sungai Selatan II",
              "Desa Hulu Sungai Selatan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Hulu Sungai Selatan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Hulu Sungai Tengah",
        "districts": [
          {
            "name": "Hulu Sungai Tengah Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Hulu Sungai Tengah I",
              "Kelurahan Hulu Sungai Tengah II",
              "Desa Hulu Sungai Tengah Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Hulu Sungai Tengah Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Hulu Sungai Utara",
        "districts": [
          {
            "name": "Hulu Sungai Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Hulu Sungai Utara I",
              "Kelurahan Hulu Sungai Utara II",
              "Desa Hulu Sungai Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Hulu Sungai Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kotabaru",
        "districts": [
          {
            "name": "Kotabaru Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kotabaru I",
              "Kelurahan Kotabaru II",
              "Desa Kotabaru Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kotabaru Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tabalong",
        "districts": [
          {
            "name": "Tabalong Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tabalong I",
              "Kelurahan Tabalong II",
              "Desa Tabalong Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tabalong Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tanah Bumbu",
        "districts": [
          {
            "name": "Tanah Bumbu Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tanah Bumbu I",
              "Kelurahan Tanah Bumbu II",
              "Desa Tanah Bumbu Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tanah Bumbu Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tanah Laut",
        "districts": [
          {
            "name": "Tanah Laut Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tanah Laut I",
              "Kelurahan Tanah Laut II",
              "Desa Tanah Laut Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tanah Laut Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tapin",
        "districts": [
          {
            "name": "Tapin Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tapin I",
              "Kelurahan Tapin II",
              "Desa Tapin Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tapin Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "kalimantan-timur",
    "name": "Kalimantan Timur",
    "cities": [
      {
        "name": "Kota Samarinda",
        "districts": [
          {
            "name": "Samarinda Kota",
            "postalCode": "75111",
            "villages": [
              "Bugis",
              "Karang Mumus",
              "Pelabuhan",
              "Pasar Pagi",
              "Sungai Pinang Luar"
            ]
          },
          {
            "name": "Samarinda Ulu",
            "postalCode": "75124",
            "villages": [
              "Air Hitam",
              "Air Putih",
              "Bukit Pinang",
              "Dadi Mulya",
              "Gunung Kelua",
              "Jawa",
              "Sidodadi",
              "Teluk Lerong Ilir"
            ]
          },
          {
            "name": "Sungai Kunjang",
            "postalCode": "75126",
            "villages": [
              "Karang Anyar",
              "Karang Asam Ilir",
              "Karang Asam Ulu",
              "Loa Bakung",
              "Loa Buah",
              "Lok Bahu",
              "Teluk Lerong Ulu"
            ]
          },
          {
            "name": "Samarinda Utara",
            "postalCode": "75119",
            "villages": [
              "Lempake",
              "Sempaja Barat",
              "Sempaja Selatan",
              "Sempaja Timur",
              "Sempaja Utara",
              "Sungai Siring",
              "Tanah Merah"
            ]
          }
        ]
      },
      {
        "name": "Kota Balikpapan",
        "districts": [
          {
            "name": "Balikpapan Kota",
            "postalCode": "76111",
            "villages": [
              "Damai",
              "Klandasan Ilir",
              "Klandasan Ulu",
              "Prapatan",
              "Telaga Sari"
            ]
          },
          {
            "name": "Balikpapan Selatan",
            "postalCode": "76114",
            "villages": [
              "Damai Bahagia",
              "Damai Baru",
              "Gunung Bahagia",
              "Sepinggan",
              "Sepinggan Baru",
              "Sepinggan Raya",
              "Sungai Nangka"
            ]
          },
          {
            "name": "Balikpapan Tengah",
            "postalCode": "76122",
            "villages": [
              "Gunung Sari Ilir",
              "Gunung Sari Ulu",
              "Karang Jati",
              "Karang Rejo",
              "Mekar Sari",
              "Sumber Rejo"
            ]
          },
          {
            "name": "Balikpapan Utara",
            "postalCode": "76125",
            "villages": [
              "Batu Ampar",
              "Graha Indah",
              "Gunung Samarinda",
              "Gunung Samarinda Baru",
              "Karang Joang",
              "Muara Rapak"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kutai Kartanegara",
        "districts": [
          {
            "name": "Tenggarong",
            "postalCode": "75511",
            "villages": [
              "Bukit Biru",
              "Jahab",
              "Loa Ipuh",
              "Loa Ipuh Darat",
              "Loa Tebu",
              "Maluhu",
              "Mangkurawang",
              "Melayu",
              "Panji",
              "Sukarame",
              "Timbau"
            ]
          }
        ]
      },
      {
        "name": "Kota Bontang",
        "districts": [
          {
            "name": "Bontang Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bontang I",
              "Kelurahan Bontang II",
              "Desa Bontang Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bontang Selatan",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Berau",
        "districts": [
          {
            "name": "Berau Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Berau I",
              "Kelurahan Berau II",
              "Desa Berau Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Berau Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kutai Barat",
        "districts": [
          {
            "name": "Kutai Barat Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kutai Barat I",
              "Kelurahan Kutai Barat II",
              "Desa Kutai Barat Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kutai Barat Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kutai Timur",
        "districts": [
          {
            "name": "Kutai Timur Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kutai Timur I",
              "Kelurahan Kutai Timur II",
              "Desa Kutai Timur Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kutai Timur Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Mahakam Ulu",
        "districts": [
          {
            "name": "Mahakam Ulu Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Mahakam Ulu I",
              "Kelurahan Mahakam Ulu II",
              "Desa Mahakam Ulu Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Mahakam Ulu Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Paser",
        "districts": [
          {
            "name": "Paser Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Paser I",
              "Kelurahan Paser II",
              "Desa Paser Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Paser Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Penajam Paser Utara",
        "districts": [
          {
            "name": "Penajam Paser Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Penajam Paser Utara I",
              "Kelurahan Penajam Paser Utara II",
              "Desa Penajam Paser Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Penajam Paser Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "kalimantan-utara",
    "name": "Kalimantan Utara",
    "cities": [
      {
        "name": "Kota Tarakan",
        "districts": [
          {
            "name": "Tarakan Barat",
            "postalCode": "77111",
            "villages": [
              "Karang Anyar",
              "Karang Anyar Pantai",
              "Karang Balik",
              "Karang Harapan",
              "Pamusian"
            ]
          },
          {
            "name": "Tarakan Tengah",
            "postalCode": "77113",
            "villages": [
              "Kampung 1 Skip",
              "Pamusian",
              "Sebengkok",
              "Selumit",
              "Selumit Pantai"
            ]
          },
          {
            "name": "Tarakan Timur",
            "postalCode": "77115",
            "villages": [
              "Gunung Lingkas",
              "Kampung Enam",
              "Kampung Empat",
              "Lingkas Ujung",
              "Mamburungan",
              "Mamburungan Timur"
            ]
          },
          {
            "name": "Tarakan Utara",
            "postalCode": "77116",
            "villages": [
              "Juata Kerikil",
              "Juata Laut",
              "Juata Permai"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bulungan",
        "districts": [
          {
            "name": "Tanjung Selor",
            "postalCode": "77211",
            "villages": [
              "Tanjung Selor Hulu",
              "Tanjung Selor Hilir",
              "Tanjung Selor Timur",
              "Jelarai Selor",
              "Tengkapak",
              "Gunung Seriang"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Nunukan",
        "districts": [
          {
            "name": "Nunukan",
            "postalCode": "77482",
            "villages": [
              "Nunukan Barat",
              "Nunukan Tengah",
              "Nunukan Timur",
              "Nunukan Utara",
              "Binusan"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Malinau",
        "districts": [
          {
            "name": "Malinau Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Malinau I",
              "Kelurahan Malinau II",
              "Desa Malinau Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Malinau Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tana Tidung",
        "districts": [
          {
            "name": "Tana Tidung Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tana Tidung I",
              "Kelurahan Tana Tidung II",
              "Desa Tana Tidung Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tana Tidung Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "sulawesi-utara",
    "name": "Sulawesi Utara",
    "cities": [
      {
        "name": "Kota Manado",
        "districts": [
          {
            "name": "Wenang",
            "postalCode": "95111",
            "villages": [
              "Bumi Beringin",
              "Calaca",
              "Komo Luar",
              "Lawangirung",
              "Mahakeret Barat",
              "Mahakeret Timur",
              "Pinaesaan",
              "Ranotana Weru",
              "Teling Bawah",
              "Tikala Kumaraka",
              "Wenas",
              "Wenang Selatan",
              "Wenang Utara"
            ]
          },
          {
            "name": "Sario",
            "postalCode": "95114",
            "villages": [
              "Ranotana",
              "Sario",
              "Sario Kotabaru",
              "Sario Tumpaan",
              "Sario Utara",
              "Titiwungen Selatan",
              "Titiwungen Utara"
            ]
          },
          {
            "name": "Malalayang",
            "postalCode": "95162",
            "villages": [
              "Bahu",
              "Batu Kota",
              "Kleak",
              "Malalayang Satu",
              "Malalayang Satu Barat",
              "Malalayang Satu Timur",
              "Malalayang Dua",
              "Winangun Satu",
              "Winangun Dua"
            ]
          },
          {
            "name": "Tikala",
            "postalCode": "95125",
            "villages": [
              "Banjer",
              "Paal IV",
              "Taas",
              "Tikala Ares",
              "Tikala Baru"
            ]
          },
          {
            "name": "Mapanget",
            "postalCode": "95258",
            "villages": [
              "Bengkol",
              "Buha",
              "Kairagi Satu",
              "Kairagi Dua",
              "Kima Atas",
              "Lapangan",
              "Paniki Bawah",
              "Paniki Satu",
              "Paniki Dua"
            ]
          }
        ]
      },
      {
        "name": "Kota Tomohon",
        "districts": [
          {
            "name": "Tomohon Tengah",
            "postalCode": "95441",
            "villages": [
              "Kamasi",
              "Kamasi Satu",
              "Kolongan",
              "Kolongan Satu",
              "Matani Satu",
              "Matani Dua",
              "Matani Tiga",
              "Paslaten Satu",
              "Paslaten Dua",
              "Talete Satu",
              "Talete Dua"
            ]
          }
        ]
      },
      {
        "name": "Kota Bitung",
        "districts": [
          {
            "name": "Maesa",
            "postalCode": "95511",
            "villages": [
              "Bitung Barat Satu",
              "Bitung Barat Dua",
              "Bitung Tengah",
              "Bitung Timur",
              "Kakenturan Satu",
              "Kakenturan Dua",
              "Madidir",
              "Pakadoodan",
              "Pateten Satu",
              "Pateten Dua"
            ]
          }
        ]
      },
      {
        "name": "Kota Kotamobagu",
        "districts": [
          {
            "name": "Kotamobagu Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kotamobagu I",
              "Kelurahan Kotamobagu II",
              "Desa Kotamobagu Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kotamobagu Selatan",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bolaang Mongondow",
        "districts": [
          {
            "name": "Bolaang Mongondow Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bolaang Mongondow I",
              "Kelurahan Bolaang Mongondow II",
              "Desa Bolaang Mongondow Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bolaang Mongondow Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bolaang Mongondow Selatan",
        "districts": [
          {
            "name": "Bolaang Mongondow Selatan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bolaang Mongondow Selatan I",
              "Kelurahan Bolaang Mongondow Selatan II",
              "Desa Bolaang Mongondow Selatan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bolaang Mongondow Selatan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bolaang Mongondow Timur",
        "districts": [
          {
            "name": "Bolaang Mongondow Timur Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bolaang Mongondow Timur I",
              "Kelurahan Bolaang Mongondow Timur II",
              "Desa Bolaang Mongondow Timur Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bolaang Mongondow Timur Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bolaang Mongondow Utara",
        "districts": [
          {
            "name": "Bolaang Mongondow Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bolaang Mongondow Utara I",
              "Kelurahan Bolaang Mongondow Utara II",
              "Desa Bolaang Mongondow Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bolaang Mongondow Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kepulauan Sangihe",
        "districts": [
          {
            "name": "Kepulauan Sangihe Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kepulauan Sangihe I",
              "Kelurahan Kepulauan Sangihe II",
              "Desa Kepulauan Sangihe Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kepulauan Sangihe Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kepulauan Siau Tagulandang Biaro",
        "districts": [
          {
            "name": "Kepulauan Siau Tagulandang Biaro Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kepulauan Siau Tagulandang Biaro I",
              "Kelurahan Kepulauan Siau Tagulandang Biaro II",
              "Desa Kepulauan Siau Tagulandang Biaro Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kepulauan Siau Tagulandang Biaro Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kepulauan Talaud",
        "districts": [
          {
            "name": "Kepulauan Talaud Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kepulauan Talaud I",
              "Kelurahan Kepulauan Talaud II",
              "Desa Kepulauan Talaud Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kepulauan Talaud Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Minahasa",
        "districts": [
          {
            "name": "Minahasa Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Minahasa I",
              "Kelurahan Minahasa II",
              "Desa Minahasa Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Minahasa Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Minahasa Selatan",
        "districts": [
          {
            "name": "Minahasa Selatan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Minahasa Selatan I",
              "Kelurahan Minahasa Selatan II",
              "Desa Minahasa Selatan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Minahasa Selatan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Minahasa Tenggara",
        "districts": [
          {
            "name": "Minahasa Tenggara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Minahasa Tenggara I",
              "Kelurahan Minahasa Tenggara II",
              "Desa Minahasa Tenggara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Minahasa Tenggara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Minahasa Utara",
        "districts": [
          {
            "name": "Minahasa Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Minahasa Utara I",
              "Kelurahan Minahasa Utara II",
              "Desa Minahasa Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Minahasa Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "gorontalo",
    "name": "Gorontalo",
    "cities": [
      {
        "name": "Kota Gorontalo",
        "districts": [
          {
            "name": "Kota Tengah",
            "postalCode": "96121",
            "villages": [
              "Dulalowo",
              "Dulalowo Timur",
              "Liluwo",
              "Paguyaman",
              "Pulubala",
              "Wumialo"
            ]
          },
          {
            "name": "Kota Selatan",
            "postalCode": "96111",
            "villages": [
              "Biawao",
              "Biawu",
              "Limba B",
              "Limba U I",
              "Limba U II"
            ]
          },
          {
            "name": "Dungingi",
            "postalCode": "96131",
            "villages": [
              "Huangobotu",
              "Libuo",
              "Tomulabutao",
              "Tomulabutao Selatan",
              "Tuladenggi"
            ]
          },
          {
            "name": "Sipatana",
            "postalCode": "96136",
            "villages": [
              "Bulotadaa",
              "Bulotadaa Timur",
              "Molosipat U",
              "Tangikiki",
              "Tapa"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Gorontalo",
        "districts": [
          {
            "name": "Limboto",
            "postalCode": "96211",
            "villages": [
              "Bolihuangga",
              "Bongohulawa",
              "Dutulanaa",
              "Hepuhulawa",
              "Hutuo",
              "Kayubulan",
              "Malahu",
              "Polohungo",
              "Tenilo"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Boalemo",
        "districts": [
          {
            "name": "Boalemo Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Boalemo I",
              "Kelurahan Boalemo II",
              "Desa Boalemo Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Boalemo Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bone Bolango",
        "districts": [
          {
            "name": "Bone Bolango Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bone Bolango I",
              "Kelurahan Bone Bolango II",
              "Desa Bone Bolango Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bone Bolango Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Gorontalo Utara",
        "districts": [
          {
            "name": "Gorontalo Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Gorontalo Utara I",
              "Kelurahan Gorontalo Utara II",
              "Desa Gorontalo Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Gorontalo Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pohuwato",
        "districts": [
          {
            "name": "Pohuwato Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pohuwato I",
              "Kelurahan Pohuwato II",
              "Desa Pohuwato Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pohuwato Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "sulawesi-tengah",
    "name": "Sulawesi Tengah",
    "cities": [
      {
        "name": "Kota Palu",
        "districts": [
          {
            "name": "Palu Timur",
            "postalCode": "94111",
            "villages": [
              "Besusu Barat",
              "Besusu Tengah",
              "Besusu Timur",
              "Lolu Selatan",
              "Lolu Utara"
            ]
          },
          {
            "name": "Palu Barat",
            "postalCode": "94221",
            "villages": [
              "Balaroa",
              "Baru",
              "Kamoji",
              "Lere",
              "Siratu",
              "Ujuna"
            ]
          },
          {
            "name": "Palu Selatan",
            "postalCode": "94231",
            "villages": [
              "Birobuli Selatan",
              "Birobuli Utara",
              "Petobo",
              "Tatura Selatan",
              "Tatura Utara"
            ]
          },
          {
            "name": "Mantikulore",
            "postalCode": "94118",
            "villages": [
              "Kawatuna",
              "Lasanimu",
              "Poboya",
              "Talise",
              "Talise Valangguni",
              "Tondo"
            ]
          },
          {
            "name": "Tatanga",
            "postalCode": "94236",
            "villages": [
              "Boyangere",
              "Duyu",
              "Nunu",
              "Palupi",
              "Pengawu",
              "Tavanjuka"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Donggala",
        "districts": [
          {
            "name": "Banawa",
            "postalCode": "94351",
            "villages": [
              "Boneoge",
              "Boyamanya",
              "Ganti",
              "Gunung Bale",
              "Kabonena",
              "Labuan Bajo",
              "Maleni",
              "Tanjung Batu"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Banggai",
        "districts": [
          {
            "name": "Banggai Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Banggai I",
              "Kelurahan Banggai II",
              "Desa Banggai Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Banggai Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Banggai Kepulauan",
        "districts": [
          {
            "name": "Banggai Kepulauan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Banggai Kepulauan I",
              "Kelurahan Banggai Kepulauan II",
              "Desa Banggai Kepulauan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Banggai Kepulauan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Banggai Laut",
        "districts": [
          {
            "name": "Banggai Laut Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Banggai Laut I",
              "Kelurahan Banggai Laut II",
              "Desa Banggai Laut Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Banggai Laut Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Buol",
        "districts": [
          {
            "name": "Buol Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Buol I",
              "Kelurahan Buol II",
              "Desa Buol Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Buol Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Morowali",
        "districts": [
          {
            "name": "Morowali Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Morowali I",
              "Kelurahan Morowali II",
              "Desa Morowali Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Morowali Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Morowali Utara",
        "districts": [
          {
            "name": "Morowali Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Morowali Utara I",
              "Kelurahan Morowali Utara II",
              "Desa Morowali Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Morowali Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Parigi Moutong",
        "districts": [
          {
            "name": "Parigi Moutong Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Parigi Moutong I",
              "Kelurahan Parigi Moutong II",
              "Desa Parigi Moutong Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Parigi Moutong Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Poso",
        "districts": [
          {
            "name": "Poso Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Poso I",
              "Kelurahan Poso II",
              "Desa Poso Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Poso Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sigi",
        "districts": [
          {
            "name": "Sigi Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sigi I",
              "Kelurahan Sigi II",
              "Desa Sigi Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sigi Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tojo Una-Una",
        "districts": [
          {
            "name": "Tojo Una-Una Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tojo Una-Una I",
              "Kelurahan Tojo Una-Una II",
              "Desa Tojo Una-Una Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tojo Una-Una Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tolitoli",
        "districts": [
          {
            "name": "Tolitoli Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tolitoli I",
              "Kelurahan Tolitoli II",
              "Desa Tolitoli Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tolitoli Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "sulawesi-barat",
    "name": "Sulawesi Barat",
    "cities": [
      {
        "name": "Kabupaten Mamuju",
        "districts": [
          {
            "name": "Mamuju",
            "postalCode": "91511",
            "villages": [
              "Binanga",
              "Karema",
              "Mamuju",
              "Rangas",
              "Rimuku",
              "Tadui"
            ]
          },
          {
            "name": "Simboro dan Kepulauan",
            "postalCode": "91512",
            "villages": [
              "Botteng",
              "Botteng Utara",
              "Patti’di",
              "Salletto",
              "Simboro",
              "Sumare"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Polewali Mandar",
        "districts": [
          {
            "name": "Polewali",
            "postalCode": "91311",
            "villages": [
              "Darma",
              "Lepo-Lepo",
              "Madatte",
              "Mandar Jaya",
              "Pekkabata",
              "Polewali",
              "Sulewatang",
              "Takatidung",
              "Wattang"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Majene",
        "districts": [
          {
            "name": "Majene Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Majene I",
              "Kelurahan Majene II",
              "Desa Majene Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Majene Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Mamasa",
        "districts": [
          {
            "name": "Mamasa Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Mamasa I",
              "Kelurahan Mamasa II",
              "Desa Mamasa Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Mamasa Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Mamuju Tengah",
        "districts": [
          {
            "name": "Mamuju Tengah Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Mamuju Tengah I",
              "Kelurahan Mamuju Tengah II",
              "Desa Mamuju Tengah Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Mamuju Tengah Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pasangkayu",
        "districts": [
          {
            "name": "Pasangkayu Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pasangkayu I",
              "Kelurahan Pasangkayu II",
              "Desa Pasangkayu Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pasangkayu Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "sulawesi-selatan",
    "name": "Sulawesi Selatan",
    "cities": [
      {
        "name": "Kota Makassar",
        "districts": [
          {
            "name": "Ujung Pandang",
            "postalCode": "90111",
            "villages": [
              "Baru",
              "Bulo Gading",
              "Kajaolalido",
              "Lae-Lae",
              "Lajangiru",
              "Losari",
              "Maloku",
              "Mangkura",
              "Pisang Selatan",
              "Pisang Utara",
              "Sawerigading"
            ]
          },
          {
            "name": "Panakkukang",
            "postalCode": "90231",
            "villages": [
              "Karakuang",
              "Karuwisi",
              "Karuwisi Utara",
              "Masale",
              "Panaikang",
              "Pandang",
              "Sinrijawa",
              "Tamamaung",
              "Tellumpoccoe",
              "Tello Baru"
            ]
          },
          {
            "name": "Rappocini",
            "postalCode": "90222",
            "villages": [
              "Balla Parang",
              "Banta-Bantaeng",
              "Bonto Makkio",
              "Buakana",
              "Gunung Sari",
              "Karunrung",
              "Kassi-Kassi",
              "Mapala",
              "Minasa Upa",
              "Rappocini",
              "Tidung"
            ]
          },
          {
            "name": "Tamalanrea",
            "postalCode": "90245",
            "villages": [
              "Bira",
              "Kapasa",
              "Kapasa Raya",
              "Parang Tambung",
              "Tamalanrea",
              "Tamalanrea Indah",
              "Tamalanrea Jaya"
            ]
          },
          {
            "name": "Biringkanaya",
            "postalCode": "90241",
            "villages": [
              "Bakung",
              "Berua",
              "Bulurokeng",
              "Daya",
              "Katimbang",
              "Laikang",
              "Paccerakkang",
              "Pai",
              "Sudiang",
              "Sudiang Raya"
            ]
          }
        ]
      },
      {
        "name": "Kota Parepare",
        "districts": [
          {
            "name": "Ujung",
            "postalCode": "91111",
            "villages": [
              "Labukkang",
              "Lapadde",
              "Mallusetasi",
              "Ujung Baru",
              "Ujung Sabbang"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Gowa",
        "districts": [
          {
            "name": "Somba Opu",
            "postalCode": "92111",
            "villages": [
              "Bonto-Bontoa",
              "Batangkaluku",
              "Katangka",
              "Manggalli",
              "Paccinongang",
              "Pandang-Pandang",
              "Romangpolong",
              "Samata",
              "Sungguminasa",
              "Tombolo",
              "Tompobalang"
            ]
          }
        ]
      },
      {
        "name": "Kota Palopo",
        "districts": [
          {
            "name": "Wara",
            "postalCode": "91911",
            "villages": [
              "Amassangan",
              "Boting",
              "Dangerakko",
              "Lagaligo",
              "Pajalesang",
              "Tompotikka"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bantaeng",
        "districts": [
          {
            "name": "Bantaeng Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bantaeng I",
              "Kelurahan Bantaeng II",
              "Desa Bantaeng Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bantaeng Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Barru",
        "districts": [
          {
            "name": "Barru Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Barru I",
              "Kelurahan Barru II",
              "Desa Barru Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Barru Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bone",
        "districts": [
          {
            "name": "Bone Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bone I",
              "Kelurahan Bone II",
              "Desa Bone Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bone Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bulukumba",
        "districts": [
          {
            "name": "Bulukumba Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bulukumba I",
              "Kelurahan Bulukumba II",
              "Desa Bulukumba Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bulukumba Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Enrekang",
        "districts": [
          {
            "name": "Enrekang Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Enrekang I",
              "Kelurahan Enrekang II",
              "Desa Enrekang Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Enrekang Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Jeneponto",
        "districts": [
          {
            "name": "Jeneponto Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Jeneponto I",
              "Kelurahan Jeneponto II",
              "Desa Jeneponto Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Jeneponto Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kepulauan Selayar",
        "districts": [
          {
            "name": "Kepulauan Selayar Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kepulauan Selayar I",
              "Kelurahan Kepulauan Selayar II",
              "Desa Kepulauan Selayar Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kepulauan Selayar Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Luwu",
        "districts": [
          {
            "name": "Luwu Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Luwu I",
              "Kelurahan Luwu II",
              "Desa Luwu Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Luwu Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Luwu Timur",
        "districts": [
          {
            "name": "Luwu Timur Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Luwu Timur I",
              "Kelurahan Luwu Timur II",
              "Desa Luwu Timur Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Luwu Timur Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Luwu Utara",
        "districts": [
          {
            "name": "Luwu Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Luwu Utara I",
              "Kelurahan Luwu Utara II",
              "Desa Luwu Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Luwu Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Maros",
        "districts": [
          {
            "name": "Maros Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Maros I",
              "Kelurahan Maros II",
              "Desa Maros Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Maros Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pangkajene dan Kepulauan",
        "districts": [
          {
            "name": "Pangkajene dan Kepulauan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pangkajene dan Kepulauan I",
              "Kelurahan Pangkajene dan Kepulauan II",
              "Desa Pangkajene dan Kepulauan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pangkajene dan Kepulauan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pinrang",
        "districts": [
          {
            "name": "Pinrang Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pinrang I",
              "Kelurahan Pinrang II",
              "Desa Pinrang Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pinrang Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sidenreng Rappang",
        "districts": [
          {
            "name": "Sidenreng Rappang Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sidenreng Rappang I",
              "Kelurahan Sidenreng Rappang II",
              "Desa Sidenreng Rappang Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sidenreng Rappang Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sinjai",
        "districts": [
          {
            "name": "Sinjai Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sinjai I",
              "Kelurahan Sinjai II",
              "Desa Sinjai Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sinjai Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Soppeng",
        "districts": [
          {
            "name": "Soppeng Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Soppeng I",
              "Kelurahan Soppeng II",
              "Desa Soppeng Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Soppeng Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Takalar",
        "districts": [
          {
            "name": "Takalar Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Takalar I",
              "Kelurahan Takalar II",
              "Desa Takalar Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Takalar Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tana Toraja",
        "districts": [
          {
            "name": "Tana Toraja Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tana Toraja I",
              "Kelurahan Tana Toraja II",
              "Desa Tana Toraja Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tana Toraja Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Toraja Utara",
        "districts": [
          {
            "name": "Toraja Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Toraja Utara I",
              "Kelurahan Toraja Utara II",
              "Desa Toraja Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Toraja Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Wajo",
        "districts": [
          {
            "name": "Wajo Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Wajo I",
              "Kelurahan Wajo II",
              "Desa Wajo Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Wajo Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "sulawesi-tenggara",
    "name": "Sulawesi Tenggara",
    "cities": [
      {
        "name": "Kota Kendari",
        "districts": [
          {
            "name": "Mandonga",
            "postalCode": "93111",
            "villages": [
              "Alolama",
              "Anggilowu",
              "Korumba",
              "Mandonga",
              "Punggaloba",
              "Wawonbalata"
            ]
          },
          {
            "name": "Kadia",
            "postalCode": "93117",
            "villages": [
              "Anaiwoi",
              "Bende",
              "Kadia",
              "Pondambea",
              "Wawowanggu"
            ]
          },
          {
            "name": "Poasia",
            "postalCode": "93231",
            "villages": [
              "Anduonohu",
              "Anggoeya",
              "Matabubu",
              "Rahandouna",
              "Wundumbatu"
            ]
          },
          {
            "name": "Kendari Barat",
            "postalCode": "93121",
            "villages": [
              "Benu-Benua",
              "Dapu-Dapura",
              "Kemaraya",
              "Lahundape",
              "Punggaloba",
              "Sodohoa",
              "Tipulu",
              "Watu-Watu"
            ]
          }
        ]
      },
      {
        "name": "Kota Baubau",
        "districts": [
          {
            "name": "Wolio",
            "postalCode": "93711",
            "villages": [
              "Bataraguru",
              "Batulo",
              "Bone-Bone",
              "Tomba",
              "Wameo",
              "Wangkanapi"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bombana",
        "districts": [
          {
            "name": "Bombana Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bombana I",
              "Kelurahan Bombana II",
              "Desa Bombana Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bombana Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Buton",
        "districts": [
          {
            "name": "Buton Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Buton I",
              "Kelurahan Buton II",
              "Desa Buton Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Buton Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Buton Selatan",
        "districts": [
          {
            "name": "Buton Selatan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Buton Selatan I",
              "Kelurahan Buton Selatan II",
              "Desa Buton Selatan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Buton Selatan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Buton Tengah",
        "districts": [
          {
            "name": "Buton Tengah Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Buton Tengah I",
              "Kelurahan Buton Tengah II",
              "Desa Buton Tengah Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Buton Tengah Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Buton Utara",
        "districts": [
          {
            "name": "Buton Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Buton Utara I",
              "Kelurahan Buton Utara II",
              "Desa Buton Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Buton Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kolaka",
        "districts": [
          {
            "name": "Kolaka Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kolaka I",
              "Kelurahan Kolaka II",
              "Desa Kolaka Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kolaka Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kolaka Timur",
        "districts": [
          {
            "name": "Kolaka Timur Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kolaka Timur I",
              "Kelurahan Kolaka Timur II",
              "Desa Kolaka Timur Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kolaka Timur Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kolaka Utara",
        "districts": [
          {
            "name": "Kolaka Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kolaka Utara I",
              "Kelurahan Kolaka Utara II",
              "Desa Kolaka Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kolaka Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Konawe",
        "districts": [
          {
            "name": "Konawe Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Konawe I",
              "Kelurahan Konawe II",
              "Desa Konawe Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Konawe Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Konawe Kepulauan",
        "districts": [
          {
            "name": "Konawe Kepulauan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Konawe Kepulauan I",
              "Kelurahan Konawe Kepulauan II",
              "Desa Konawe Kepulauan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Konawe Kepulauan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Konawe Selatan",
        "districts": [
          {
            "name": "Konawe Selatan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Konawe Selatan I",
              "Kelurahan Konawe Selatan II",
              "Desa Konawe Selatan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Konawe Selatan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Konawe Utara",
        "districts": [
          {
            "name": "Konawe Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Konawe Utara I",
              "Kelurahan Konawe Utara II",
              "Desa Konawe Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Konawe Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Muna",
        "districts": [
          {
            "name": "Muna Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Muna I",
              "Kelurahan Muna II",
              "Desa Muna Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Muna Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Muna Barat",
        "districts": [
          {
            "name": "Muna Barat Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Muna Barat I",
              "Kelurahan Muna Barat II",
              "Desa Muna Barat Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Muna Barat Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Wakatobi",
        "districts": [
          {
            "name": "Wakatobi Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Wakatobi I",
              "Kelurahan Wakatobi II",
              "Desa Wakatobi Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Wakatobi Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bali",
    "name": "Bali",
    "cities": [
      {
        "name": "Kota Denpasar",
        "districts": [
          {
            "name": "Denpasar Barat",
            "postalCode": "80119",
            "villages": [
              "Dauh Puri",
              "Dauh Puri Kangin",
              "Dauh Puri Kauh",
              "Dauh Puri Klod",
              "Padangsambian",
              "Padangsambian Kaja",
              "Padangsambian Klod",
              "Pemecutan",
              "Pemecutan Klod",
              "Tegal Harum",
              "Tegal Kertha"
            ]
          },
          {
            "name": "Denpasar Selatan",
            "postalCode": "80221",
            "villages": [
              "Panjer",
              "Pedungan",
              "Pemogan",
              "Renon",
              "Sanur",
              "Sanur Kaja",
              "Sanur Kauh",
              "Serangan",
              "Sidakarya"
            ]
          },
          {
            "name": "Denpasar Timur",
            "postalCode": "80231",
            "villages": [
              "Dangin Puri",
              "Dangin Puri Kangin",
              "Dangin Puri Klod",
              "Kesiman",
              "Kesiman Petilan",
              "Kesiman Kertalangu",
              "Penatih",
              "Penatih Dangin Puri",
              "Sumerta",
              "Sumerta Kaja",
              "Sumerta Kauh",
              "Sumerta Klod"
            ]
          },
          {
            "name": "Denpasar Utara",
            "postalCode": "80115",
            "villages": [
              "Dangin Puri Kaja",
              "Dangin Puri Kangin",
              "Dangin Puri Kauh",
              "Peguyangan",
              "Peguyangan Kaja",
              "Peguyangan Kangin",
              "Pemecutan Kaja",
              "Tonja",
              "Ubung",
              "Ubung Kaja"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Badung",
        "districts": [
          {
            "name": "Kuta",
            "postalCode": "80361",
            "villages": [
              "Kedonganan",
              "Kuta",
              "Legian",
              "Seminyak",
              "Tuban"
            ]
          },
          {
            "name": "Kuta Selatan (Nusa Dua / Jimbaran)",
            "postalCode": "80361",
            "villages": [
              "Benoa",
              "Jimbaran",
              "Kutuh",
              "Pecatu",
              "Tanjung Benoa",
              "Ungasan"
            ]
          },
          {
            "name": "Kuta Utara (Canggu)",
            "postalCode": "80361",
            "villages": [
              "Canggu",
              "Dalung",
              "Kerobokan",
              "Kerobokan Kelod",
              "Kerobokan Kaja",
              "Tibubeneng"
            ]
          },
          {
            "name": "Mengwi",
            "postalCode": "80351",
            "villages": [
              "Abianbase",
              "Baha",
              "Buduk",
              "Cemagi",
              "Gulingan",
              "Kapal",
              "Kekeran",
              "Kuwum",
              "Lukluk",
              "Mengwi",
              "Mengwitani",
              "Munggu",
              "Penarungan",
              "Pererenan",
              "Sembung",
              "Sobangan",
              "Tumbak Bayuh",
              "Werdi Bhuwana"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Gianyar (Ubud)",
        "districts": [
          {
            "name": "Ubud",
            "postalCode": "80571",
            "villages": [
              "Kedewatan",
              "Lodtunduh",
              "Mas",
              "Peliatan",
              "Petulu",
              "Sayan",
              "Singakerta",
              "Ubud"
            ]
          },
          {
            "name": "Gianyar",
            "postalCode": "80511",
            "villages": [
              "Abianbase",
              "Beng",
              "Bitera",
              "Gianyar",
              "Samplangan",
              "Serongga",
              "Siangan",
              "Suwat",
              "Tegal Tugu",
              "Tulikup"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tabanan",
        "districts": [
          {
            "name": "Tabanan",
            "postalCode": "82111",
            "villages": [
              "Bongan",
              "Buahan",
              "Dajan Peken",
              "Dauh Peken",
              "Delod Peken",
              "Denbantas",
              "Gubug",
              "Sesandan",
              "Subamia",
              "Sudimara",
              "Tunjuk",
              "Wanasari"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Bangli",
        "districts": [
          {
            "name": "Bangli Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Bangli I",
              "Kelurahan Bangli II",
              "Desa Bangli Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Bangli Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Buleleng",
        "districts": [
          {
            "name": "Buleleng Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Buleleng I",
              "Kelurahan Buleleng II",
              "Desa Buleleng Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Buleleng Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Gianyar",
        "districts": [
          {
            "name": "Gianyar Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Gianyar I",
              "Kelurahan Gianyar II",
              "Desa Gianyar Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Gianyar Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Jembrana",
        "districts": [
          {
            "name": "Jembrana Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Jembrana I",
              "Kelurahan Jembrana II",
              "Desa Jembrana Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Jembrana Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Karangasem",
        "districts": [
          {
            "name": "Karangasem Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Karangasem I",
              "Kelurahan Karangasem II",
              "Desa Karangasem Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Karangasem Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Klungkung",
        "districts": [
          {
            "name": "Klungkung Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Klungkung I",
              "Kelurahan Klungkung II",
              "Desa Klungkung Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Klungkung Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "nusa-tenggara-barat",
    "name": "Nusa Tenggara Barat",
    "cities": [
      {
        "name": "Kota Mataram",
        "districts": [
          {
            "name": "Mataram",
            "postalCode": "83121",
            "villages": [
              "Mataram Timur",
              "Pagesangan",
              "Pagesangan Barat",
              "Pagesangan Timur",
              "Pagutan",
              "Pagutan Barat",
              "Pagutan Timur",
              "Pejanggik",
              "Punia"
            ]
          },
          {
            "name": "Ampenan",
            "postalCode": "83111",
            "villages": [
              "Ampenan Selatan",
              "Ampenan Tengah",
              "Ampenan Utara",
              "Bintaro",
              "Banjar",
              "Dayan Peken",
              "Kebun Sari",
              "Pejeruk",
              "Taman Sari"
            ]
          },
          {
            "name": "Cakranegara",
            "postalCode": "83231",
            "villages": [
              "Cakranegara Barat",
              "Cakranegara Selatan",
              "Cakranegara Selatan Baru",
              "Cakranegara Timur",
              "Cakranegara Utara",
              "Cilinaya",
              "Mayura",
              "Sapta Marga",
              "Sayang-Sayang",
              "Turida"
            ]
          },
          {
            "name": "Sekarbela",
            "postalCode": "83115",
            "villages": [
              "Karang Pule",
              "Kekalik Jaya",
              "Jempong Baru",
              "Tanjung Karang",
              "Tanjung Karang Permai"
            ]
          },
          {
            "name": "Selaparang",
            "postalCode": "83124",
            "villages": [
              "Dasar Agung",
              "Dasar Cermen",
              "Gomong",
              "Karang Baru",
              "Mataram Barat",
              "Monjok",
              "Monjok Barat",
              "Monjok Timur",
              "Rembiga"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Lombok Barat",
        "districts": [
          {
            "name": "Gerung",
            "postalCode": "83363",
            "villages": [
              "Babat",
              "Dasan Tapen",
              "Gapuk",
              "Gerung Selatan",
              "Gerung Utara",
              "Kebun Ayu",
              "Mesanggok",
              "Suka Makmur"
            ]
          },
          {
            "name": "Batu Layar (Senggigi)",
            "postalCode": "83355",
            "villages": [
              "Batu Layar",
              "Batu Layar Barat",
              "Bengkaung",
              "Meninting",
              "Sandik",
              "Senggigi",
              "Senteluk"
            ]
          }
        ]
      },
      {
        "name": "Kota Bima",
        "districts": [
          {
            "name": "Rasanae Barat",
            "postalCode": "84111",
            "villages": [
              "Dara",
              "Nae",
              "Pane",
              "Paruga",
              "Sarae",
              "Tanjung"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Lombok Tengah",
        "districts": [
          {
            "name": "Lombok Tengah Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Lombok Tengah I",
              "Kelurahan Lombok Tengah II",
              "Desa Lombok Tengah Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Lombok Tengah Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Lombok Timur",
        "districts": [
          {
            "name": "Lombok Timur Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Lombok Timur I",
              "Kelurahan Lombok Timur II",
              "Desa Lombok Timur Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Lombok Timur Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Lombok Utara",
        "districts": [
          {
            "name": "Lombok Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Lombok Utara I",
              "Kelurahan Lombok Utara II",
              "Desa Lombok Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Lombok Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sumbawa",
        "districts": [
          {
            "name": "Sumbawa Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sumbawa I",
              "Kelurahan Sumbawa II",
              "Desa Sumbawa Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sumbawa Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sumbawa Barat",
        "districts": [
          {
            "name": "Sumbawa Barat Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sumbawa Barat I",
              "Kelurahan Sumbawa Barat II",
              "Desa Sumbawa Barat Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sumbawa Barat Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Dompu",
        "districts": [
          {
            "name": "Dompu Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Dompu I",
              "Kelurahan Dompu II",
              "Desa Dompu Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Dompu Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "nusa-tenggara-timur",
    "name": "Nusa Tenggara Timur",
    "cities": [
      {
        "name": "Kota Kupang",
        "districts": [
          {
            "name": "Oebobo",
            "postalCode": "85111",
            "villages": [
              "Fatukoa",
              "Kayu Putih",
              "Liliba",
              "Oebobo",
              "Oebufu",
              "Tuak Daun Merah"
            ]
          },
          {
            "name": "Kelapa Lima",
            "postalCode": "85228",
            "villages": [
              "Kelapa Lima",
              "Lasiana",
              "Oesapa",
              "Oesapa Barat",
              "Oesapa Selatan"
            ]
          },
          {
            "name": "Maulafa",
            "postalCode": "85142",
            "villages": [
              "Belo",
              "Fatukoa",
              "Kolhua",
              "Maulafa",
              "Naikolan",
              "Naimata",
              "Penfui",
              "Sikumana"
            ]
          },
          {
            "name": "Alak",
            "postalCode": "85231",
            "villages": [
              "Alak",
              "Batuplat",
              "Fatufeto",
              "Mantasi",
              "Manulai II",
              "Manutapen",
              "Naioni",
              "Namosain",
              "Nunbaun Delha",
              "Nunbaun Sabu",
              "Nunhila",
              "Penkase Oeleta"
            ]
          },
          {
            "name": "Kota Raja",
            "postalCode": "85119",
            "villages": [
              "Airnona",
              "Bakunase",
              "Bakunase II",
              "Fontein",
              "Kuanino",
              "Manutapen",
              "Naikoten I",
              "Naikoten II",
              "Nunleu"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Manggarai Barat (Labuan Bajo)",
        "districts": [
          {
            "name": "Komodo",
            "postalCode": "86754",
            "villages": [
              "Batu Cermin",
              "Gorontalo",
              "Labuan Bajo",
              "Macang Tanggar",
              "Nggorang",
              "Pasir Panjang",
              "Seraya Marannu",
              "Tiwu Nampar",
              "Warloka"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sikka (Maumere)",
        "districts": [
          {
            "name": "Alok",
            "postalCode": "86111",
            "villages": [
              "Kota Uneng",
              "Madawat",
              "Nangameting",
              "Kabor",
              "Wuring"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Alor",
        "districts": [
          {
            "name": "Alor Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Alor I",
              "Kelurahan Alor II",
              "Desa Alor Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Alor Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Belu",
        "districts": [
          {
            "name": "Belu Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Belu I",
              "Kelurahan Belu II",
              "Desa Belu Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Belu Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Ende",
        "districts": [
          {
            "name": "Ende Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Ende I",
              "Kelurahan Ende II",
              "Desa Ende Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Ende Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Flores Timur",
        "districts": [
          {
            "name": "Flores Timur Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Flores Timur I",
              "Kelurahan Flores Timur II",
              "Desa Flores Timur Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Flores Timur Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Lembata",
        "districts": [
          {
            "name": "Lembata Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Lembata I",
              "Kelurahan Lembata II",
              "Desa Lembata Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Lembata Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Malaka",
        "districts": [
          {
            "name": "Malaka Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Malaka I",
              "Kelurahan Malaka II",
              "Desa Malaka Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Malaka Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Manggarai",
        "districts": [
          {
            "name": "Manggarai Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Manggarai I",
              "Kelurahan Manggarai II",
              "Desa Manggarai Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Manggarai Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Manggarai Barat",
        "districts": [
          {
            "name": "Manggarai Barat Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Manggarai Barat I",
              "Kelurahan Manggarai Barat II",
              "Desa Manggarai Barat Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Manggarai Barat Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Manggarai Timur",
        "districts": [
          {
            "name": "Manggarai Timur Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Manggarai Timur I",
              "Kelurahan Manggarai Timur II",
              "Desa Manggarai Timur Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Manggarai Timur Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Nagekeo",
        "districts": [
          {
            "name": "Nagekeo Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Nagekeo I",
              "Kelurahan Nagekeo II",
              "Desa Nagekeo Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Nagekeo Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Ngada",
        "districts": [
          {
            "name": "Ngada Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Ngada I",
              "Kelurahan Ngada II",
              "Desa Ngada Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Ngada Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Rote Ndao",
        "districts": [
          {
            "name": "Rote Ndao Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Rote Ndao I",
              "Kelurahan Rote Ndao II",
              "Desa Rote Ndao Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Rote Ndao Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sabu Raijua",
        "districts": [
          {
            "name": "Sabu Raijua Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sabu Raijua I",
              "Kelurahan Sabu Raijua II",
              "Desa Sabu Raijua Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sabu Raijua Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sikka",
        "districts": [
          {
            "name": "Sikka Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sikka I",
              "Kelurahan Sikka II",
              "Desa Sikka Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sikka Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sumba Barat",
        "districts": [
          {
            "name": "Sumba Barat Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sumba Barat I",
              "Kelurahan Sumba Barat II",
              "Desa Sumba Barat Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sumba Barat Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sumba Barat Daya",
        "districts": [
          {
            "name": "Sumba Barat Daya Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sumba Barat Daya I",
              "Kelurahan Sumba Barat Daya II",
              "Desa Sumba Barat Daya Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sumba Barat Daya Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sumba Tengah",
        "districts": [
          {
            "name": "Sumba Tengah Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sumba Tengah I",
              "Kelurahan Sumba Tengah II",
              "Desa Sumba Tengah Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sumba Tengah Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sumba Timur",
        "districts": [
          {
            "name": "Sumba Timur Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sumba Timur I",
              "Kelurahan Sumba Timur II",
              "Desa Sumba Timur Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sumba Timur Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Timor Tengah Selatan",
        "districts": [
          {
            "name": "Timor Tengah Selatan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Timor Tengah Selatan I",
              "Kelurahan Timor Tengah Selatan II",
              "Desa Timor Tengah Selatan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Timor Tengah Selatan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Timor Tengah Utara",
        "districts": [
          {
            "name": "Timor Tengah Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Timor Tengah Utara I",
              "Kelurahan Timor Tengah Utara II",
              "Desa Timor Tengah Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Timor Tengah Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "maluku",
    "name": "Maluku",
    "cities": [
      {
        "name": "Kota Ambon",
        "districts": [
          {
            "name": "Sirimau",
            "postalCode": "97121",
            "villages": [
              "Ahusen",
              "Batu Gajah",
              "Batu Meja",
              "Honipopu",
              "Karang Panjang",
              "Pandang-Pandang",
              "Rijali",
              "Soya",
              "Uritetu",
              "Waihaong",
              "Galala",
              "Hative Kecil"
            ]
          },
          {
            "name": "Nusaniwe",
            "postalCode": "97111",
            "villages": [
              "Amahusu",
              "Benteng",
              "Kudamati",
              "Mangga Dua",
              "Nusaniwe",
              "Silale",
              "Urimessing",
              "Waihaong",
              "Wainitu"
            ]
          },
          {
            "name": "Teluk Ambon",
            "postalCode": "97232",
            "villages": [
              "Hative Besar",
              "Hunut",
              "Laha",
              "Poka",
              "Rumahtiga",
              "Tawiri",
              "Wayame"
            ]
          },
          {
            "name": "Baguala",
            "postalCode": "97231",
            "villages": [
              "Halong",
              "Lateri",
              "Passo",
              "Waitatiri",
              "Negeri Lama"
            ]
          }
        ]
      },
      {
        "name": "Kota Tual",
        "districts": [
          {
            "name": "Pulau Dullah Selatan",
            "postalCode": "97611",
            "villages": [
              "Ketsoblak",
              "Lodang",
              "Masrum",
              "Taar",
              "Tual"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Buru",
        "districts": [
          {
            "name": "Buru Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Buru I",
              "Kelurahan Buru II",
              "Desa Buru Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Buru Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Buru Selatan",
        "districts": [
          {
            "name": "Buru Selatan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Buru Selatan I",
              "Kelurahan Buru Selatan II",
              "Desa Buru Selatan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Buru Selatan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kepulauan Aru",
        "districts": [
          {
            "name": "Kepulauan Aru Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kepulauan Aru I",
              "Kelurahan Kepulauan Aru II",
              "Desa Kepulauan Aru Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kepulauan Aru Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kepulauan Tanimbar",
        "districts": [
          {
            "name": "Kepulauan Tanimbar Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kepulauan Tanimbar I",
              "Kelurahan Kepulauan Tanimbar II",
              "Desa Kepulauan Tanimbar Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kepulauan Tanimbar Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Maluku Barat Daya",
        "districts": [
          {
            "name": "Maluku Barat Daya Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Maluku Barat Daya I",
              "Kelurahan Maluku Barat Daya II",
              "Desa Maluku Barat Daya Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Maluku Barat Daya Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Maluku Tengah",
        "districts": [
          {
            "name": "Maluku Tengah Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Maluku Tengah I",
              "Kelurahan Maluku Tengah II",
              "Desa Maluku Tengah Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Maluku Tengah Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Maluku Tenggara",
        "districts": [
          {
            "name": "Maluku Tenggara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Maluku Tenggara I",
              "Kelurahan Maluku Tenggara II",
              "Desa Maluku Tenggara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Maluku Tenggara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Seram Bagian Barat",
        "districts": [
          {
            "name": "Seram Bagian Barat Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Seram Bagian Barat I",
              "Kelurahan Seram Bagian Barat II",
              "Desa Seram Bagian Barat Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Seram Bagian Barat Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Seram Bagian Timur",
        "districts": [
          {
            "name": "Seram Bagian Timur Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Seram Bagian Timur I",
              "Kelurahan Seram Bagian Timur II",
              "Desa Seram Bagian Timur Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Seram Bagian Timur Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "maluku-utara",
    "name": "Maluku Utara",
    "cities": [
      {
        "name": "Kota Ternate",
        "districts": [
          {
            "name": "Ternate Tengah",
            "postalCode": "97711",
            "villages": [
              "Gamalama",
              "Kampung Pisang",
              "Kota Baru",
              "Maliaro",
              "Marikurubu",
              "Muhajirin",
              "Salahuddin",
              "Santiong",
              "Stadion",
              "Takoma",
              "Tanah Raja"
            ]
          },
          {
            "name": "Ternate Selatan",
            "postalCode": "97716",
            "villages": [
              "Bastiong Karance",
              "Bastiong Talangame",
              "Fitu",
              "Gambesi",
              "Kalumata",
              "Kayu Merah",
              "Mangga Dua",
              "Sasa",
              "Toboko",
              "Ubo-Ubo"
            ]
          },
          {
            "name": "Ternate Utara",
            "postalCode": "97721",
            "villages": [
              "Akehuda",
              "Dufa-Dufa",
              "Salero",
              "Sangaji",
              "Soasio",
              "Tabam",
              "Tafure",
              "Tarau",
              "Tuboh"
            ]
          }
        ]
      },
      {
        "name": "Kota Tidore Kepulauan",
        "districts": [
          {
            "name": "Tidore",
            "postalCode": "97811",
            "villages": [
              "Gamtufkange",
              "Goto",
              "Gurabunga",
              "Indomut",
              "Soasio",
              "Tambula",
              "Tomagoba",
              "Tuguiha"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Halmahera Barat",
        "districts": [
          {
            "name": "Halmahera Barat Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Halmahera Barat I",
              "Kelurahan Halmahera Barat II",
              "Desa Halmahera Barat Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Halmahera Barat Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Halmahera Tengah",
        "districts": [
          {
            "name": "Halmahera Tengah Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Halmahera Tengah I",
              "Kelurahan Halmahera Tengah II",
              "Desa Halmahera Tengah Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Halmahera Tengah Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Halmahera Timur",
        "districts": [
          {
            "name": "Halmahera Timur Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Halmahera Timur I",
              "Kelurahan Halmahera Timur II",
              "Desa Halmahera Timur Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Halmahera Timur Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Halmahera Selatan",
        "districts": [
          {
            "name": "Halmahera Selatan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Halmahera Selatan I",
              "Kelurahan Halmahera Selatan II",
              "Desa Halmahera Selatan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Halmahera Selatan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Halmahera Utara",
        "districts": [
          {
            "name": "Halmahera Utara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Halmahera Utara I",
              "Kelurahan Halmahera Utara II",
              "Desa Halmahera Utara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Halmahera Utara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kepulauan Sula",
        "districts": [
          {
            "name": "Kepulauan Sula Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kepulauan Sula I",
              "Kelurahan Kepulauan Sula II",
              "Desa Kepulauan Sula Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kepulauan Sula Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pulau Morotai",
        "districts": [
          {
            "name": "Pulau Morotai Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pulau Morotai I",
              "Kelurahan Pulau Morotai II",
              "Desa Pulau Morotai Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pulau Morotai Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pulau Taliabu",
        "districts": [
          {
            "name": "Pulau Taliabu Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pulau Taliabu I",
              "Kelurahan Pulau Taliabu II",
              "Desa Pulau Taliabu Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pulau Taliabu Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "papua",
    "name": "Papua",
    "cities": [
      {
        "name": "Kota Jayapura",
        "districts": [
          {
            "name": "Jayapura Utara",
            "postalCode": "99111",
            "villages": [
              "Angkasapura",
              "Bayangkara",
              "Gurabesi",
              "Imbi",
              "Kayo Batu",
              "Mandala",
              "Tanjung Ria",
              "Trikora"
            ]
          },
          {
            "name": "Jayapura Selatan",
            "postalCode": "99221",
            "villages": [
              "Hamadi",
              "Numbai",
              "Numbay",
              "Tahima Soroma",
              "Tobati",
              "Entrop",
              "Argapura"
            ]
          },
          {
            "name": "Abepura",
            "postalCode": "99351",
            "villages": [
              "Abepantai",
              "Asano",
              "Awiyo",
              "Enggros",
              "Koya Koso",
              "Kotabaru",
              "Nafri",
              "Vim",
              "Wahno",
              "Way Mhorock",
              "Yobe"
            ]
          },
          {
            "name": "Heram",
            "postalCode": "99358",
            "villages": [
              "Hedam",
              "Waena",
              "Yabansai",
              "Kampung Waena",
              "Yoka"
            ]
          },
          {
            "name": "Muara Tami",
            "postalCode": "99356",
            "villages": [
              "Holtekamp",
              "Koya Barat",
              "Koya Timur",
              "Mosso",
              "Skouw Mabo",
              "Skouw Sae",
              "Skouw Yambe"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Jayapura (Sentani)",
        "districts": [
          {
            "name": "Sentani",
            "postalCode": "99352",
            "villages": [
              "Dobonsolo",
              "Hinekombe",
              "Hobong",
              "Ifar Besar",
              "Nendali",
              "Sereh",
              "Yobeh",
              "Yoboi"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Biak Numfor",
        "districts": [
          {
            "name": "Biak Numfor Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Biak Numfor I",
              "Kelurahan Biak Numfor II",
              "Desa Biak Numfor Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Biak Numfor Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Keerom",
        "districts": [
          {
            "name": "Keerom Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Keerom I",
              "Kelurahan Keerom II",
              "Desa Keerom Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Keerom Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kepulauan Yapen",
        "districts": [
          {
            "name": "Kepulauan Yapen Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kepulauan Yapen I",
              "Kelurahan Kepulauan Yapen II",
              "Desa Kepulauan Yapen Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kepulauan Yapen Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Mamberamo Raya",
        "districts": [
          {
            "name": "Mamberamo Raya Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Mamberamo Raya I",
              "Kelurahan Mamberamo Raya II",
              "Desa Mamberamo Raya Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Mamberamo Raya Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sarmi",
        "districts": [
          {
            "name": "Sarmi Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sarmi I",
              "Kelurahan Sarmi II",
              "Desa Sarmi Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sarmi Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Supiori",
        "districts": [
          {
            "name": "Supiori Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Supiori I",
              "Kelurahan Supiori II",
              "Desa Supiori Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Supiori Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Waropen",
        "districts": [
          {
            "name": "Waropen Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Waropen I",
              "Kelurahan Waropen II",
              "Desa Waropen Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Waropen Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "papua-barat",
    "name": "Papua Barat",
    "cities": [
      {
        "name": "Kabupaten Manokwari",
        "districts": [
          {
            "name": "Manokwari Barat",
            "postalCode": "98311",
            "villages": [
              "Amban",
              "Manokwari Barat",
              "Manokwari Timur",
              "Padarni",
              "Sanggeng",
              "Wosi"
            ]
          },
          {
            "name": "Manokwari Timur",
            "postalCode": "98312",
            "villages": [
              "Arowi",
              "Ayambori",
              "Bakaro",
              "Pasir Putih",
              "Susuang"
            ]
          },
          {
            "name": "Manokwari Selatan",
            "postalCode": "98313",
            "villages": [
              "Anday",
              "Maripi",
              "Sowi",
              "Warpramasi"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Fakfak",
        "districts": [
          {
            "name": "Fakfak",
            "postalCode": "98611",
            "villages": [
              "Danaweria",
              "Fakfak",
              "Fakfak Selatan",
              "Wagom",
              "Wagom Utara"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Kaimana",
        "districts": [
          {
            "name": "Kaimana Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Kaimana I",
              "Kelurahan Kaimana II",
              "Desa Kaimana Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Kaimana Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Manokwari Selatan",
        "districts": [
          {
            "name": "Manokwari Selatan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Manokwari Selatan I",
              "Kelurahan Manokwari Selatan II",
              "Desa Manokwari Selatan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Manokwari Selatan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pegunungan Arfak",
        "districts": [
          {
            "name": "Pegunungan Arfak Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pegunungan Arfak I",
              "Kelurahan Pegunungan Arfak II",
              "Desa Pegunungan Arfak Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pegunungan Arfak Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Teluk Bintuni",
        "districts": [
          {
            "name": "Teluk Bintuni Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Teluk Bintuni I",
              "Kelurahan Teluk Bintuni II",
              "Desa Teluk Bintuni Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Teluk Bintuni Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Teluk Wondama",
        "districts": [
          {
            "name": "Teluk Wondama Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Teluk Wondama I",
              "Kelurahan Teluk Wondama II",
              "Desa Teluk Wondama Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Teluk Wondama Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "papua-barat-daya",
    "name": "Papua Barat Daya",
    "cities": [
      {
        "name": "Kota Sorong",
        "districts": [
          {
            "name": "Sorong Kota",
            "postalCode": "98411",
            "villages": [
              "Kampung Baru",
              "Klademak",
              "Klasi",
              "Klasuur",
              "Malabutor",
              "Puncak Cendrawasih",
              "Remu Selatan",
              "Remu Utara"
            ]
          },
          {
            "name": "Sorong Barat",
            "postalCode": "98412",
            "villages": [
              "Klawasi",
              "Pal Putih",
              "Rufei",
              "Tampa Garam"
            ]
          },
          {
            "name": "Sorong Timur",
            "postalCode": "98414",
            "villages": [
              "Klamana",
              "Kladufu",
              "Klawalu",
              "Klawuyuk"
            ]
          },
          {
            "name": "Sorong Utara",
            "postalCode": "98415",
            "villages": [
              "Malasilen",
              "Malanu",
              "Sawagumu"
            ]
          },
          {
            "name": "Sorong Manoi",
            "postalCode": "98413",
            "villages": [
              "Klaligi",
              "Klasabi",
              "Malawei",
              "Remu"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Raja Ampat (Waisai)",
        "districts": [
          {
            "name": "Kota Waisai",
            "postalCode": "98482",
            "villages": [
              "Bonkawir",
              "Sapordanko",
              "Waisai",
              "Warmasen"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Maybrat",
        "districts": [
          {
            "name": "Maybrat Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Maybrat I",
              "Kelurahan Maybrat II",
              "Desa Maybrat Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Maybrat Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Raja Ampat",
        "districts": [
          {
            "name": "Raja Ampat Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Raja Ampat I",
              "Kelurahan Raja Ampat II",
              "Desa Raja Ampat Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Raja Ampat Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Sorong Selatan",
        "districts": [
          {
            "name": "Sorong Selatan Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Sorong Selatan I",
              "Kelurahan Sorong Selatan II",
              "Desa Sorong Selatan Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Sorong Selatan Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tambrauw",
        "districts": [
          {
            "name": "Tambrauw Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tambrauw I",
              "Kelurahan Tambrauw II",
              "Desa Tambrauw Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tambrauw Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "papua-selatan",
    "name": "Papua Selatan",
    "cities": [
      {
        "name": "Kabupaten Merauke",
        "districts": [
          {
            "name": "Merauke",
            "postalCode": "99611",
            "villages": [
              "Bambu Pemali",
              "Karang Indah",
              "Kelapa Lima",
              "Kuda Mati",
              "Maro",
              "Merauke",
              "Mopah Lama",
              "Namas",
              "Rimbe Jaya",
              "Samkai",
              "Seringgu Jaya"
            ]
          },
          {
            "name": "Semangga",
            "postalCode": "99631",
            "villages": [
              "Kuprik",
              "Marga Mulya",
              "Muram Sari",
              "Semangga Jaya",
              "Sidomulyo",
              "Urumb",
              "Waninggap Miraf",
              "Waninggap Nanggo"
            ]
          },
          {
            "name": "Tanah Miring",
            "postalCode": "99632",
            "villages": [
              "Hidup Baru",
              "Isano Mbias",
              "Kamangi",
              "Sari Mulya",
              "Tambat",
              "Yaba Mahika",
              "Yasa Mulya"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Boven Digoel",
        "districts": [
          {
            "name": "Mandobo (Tanah Merah)",
            "postalCode": "99663",
            "villages": [
              "Ampera",
              "Mawan",
              "Persatuan",
              "Sokanggo",
              "Tanah Merah"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Asmat",
        "districts": [
          {
            "name": "Asmat Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Asmat I",
              "Kelurahan Asmat II",
              "Desa Asmat Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Asmat Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Mappi",
        "districts": [
          {
            "name": "Mappi Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Mappi I",
              "Kelurahan Mappi II",
              "Desa Mappi Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Mappi Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "papua-pegunungan",
    "name": "Papua Pegunungan",
    "cities": [
      {
        "name": "Kabupaten Jayawijaya (Wamena)",
        "districts": [
          {
            "name": "Wamena",
            "postalCode": "99511",
            "villages": [
              "Autakma",
              "Hukimo",
              "Honelama",
              "Sinakma",
              "Wamena",
              "Wamena Kota",
              "Wouma"
            ]
          },
          {
            "name": "Hubikiak",
            "postalCode": "99512",
            "villages": [
              "Anelak",
              "Boluwondok",
              "Dukobak",
              "Kikimo",
              "Pasema"
            ]
          },
          {
            "name": "Asologaima",
            "postalCode": "99513",
            "villages": [
              "Kimima",
              "Kimbim",
              "Wamarek",
              "Wamena Utara"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tolikara (Karubaga)",
        "districts": [
          {
            "name": "Karubaga",
            "postalCode": "99564",
            "villages": [
              "Golom",
              "Karubaga",
              "Kogome",
              "Kolengka",
              "Limbaga"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Jayawijaya",
        "districts": [
          {
            "name": "Jayawijaya Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Jayawijaya I",
              "Kelurahan Jayawijaya II",
              "Desa Jayawijaya Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Jayawijaya Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Lanny Jaya",
        "districts": [
          {
            "name": "Lanny Jaya Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Lanny Jaya I",
              "Kelurahan Lanny Jaya II",
              "Desa Lanny Jaya Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Lanny Jaya Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Mamberamo Tengah",
        "districts": [
          {
            "name": "Mamberamo Tengah Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Mamberamo Tengah I",
              "Kelurahan Mamberamo Tengah II",
              "Desa Mamberamo Tengah Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Mamberamo Tengah Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Nduga",
        "districts": [
          {
            "name": "Nduga Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Nduga I",
              "Kelurahan Nduga II",
              "Desa Nduga Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Nduga Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Pegunungan Bintang",
        "districts": [
          {
            "name": "Pegunungan Bintang Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Pegunungan Bintang I",
              "Kelurahan Pegunungan Bintang II",
              "Desa Pegunungan Bintang Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Pegunungan Bintang Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Tolikara",
        "districts": [
          {
            "name": "Tolikara Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Tolikara I",
              "Kelurahan Tolikara II",
              "Desa Tolikara Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Tolikara Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Yahukimo",
        "districts": [
          {
            "name": "Yahukimo Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Yahukimo I",
              "Kelurahan Yahukimo II",
              "Desa Yahukimo Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Yahukimo Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Yalimo",
        "districts": [
          {
            "name": "Yalimo Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Yalimo I",
              "Kelurahan Yalimo II",
              "Desa Yalimo Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Yalimo Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "papua-tengah",
    "name": "Papua Tengah",
    "cities": [
      {
        "name": "Kabupaten Nabire",
        "districts": [
          {
            "name": "Nabire",
            "postalCode": "98811",
            "villages": [
              "Girimulyo",
              "Kalibobo",
              "Karang Mulia",
              "Karang Tumaritis",
              "Morgo",
              "Nabire Barat",
              "Nabire Kota",
              "Nabarua",
              "Oyehe",
              "Siriwini"
            ]
          },
          {
            "name": "Nabire Barat",
            "postalCode": "98814",
            "villages": [
              "Bumi Mulia",
              "Bumi Raya",
              "Kalisemen",
              "Wadio",
              "Wanggar Sari"
            ]
          },
          {
            "name": "Teluk Kimi",
            "postalCode": "98815",
            "villages": [
              "Air Mandidi",
              "Kimi",
              "Laimo",
              "Samabusa",
              "Waharia"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Mimika (Timika)",
        "districts": [
          {
            "name": "Mimika Baru",
            "postalCode": "99910",
            "villages": [
              "Hangaitji",
              "Kebun Sirih",
              "Kwamki",
              "Nayaro",
              "Otakwa",
              "Passir Putih",
              "Sempan",
              "Timika Jaya",
              "Wanagon"
            ]
          },
          {
            "name": "Kuala Kencana",
            "postalCode": "99920",
            "villages": [
              "Bumi Wonorejo",
              "Karang Senang",
              "Kuala Kencana",
              "Liputan",
              "Utikini Baru"
            ]
          },
          {
            "name": "Wania",
            "postalCode": "99911",
            "villages": [
              "Inauga",
              "Kadun Jaya",
              "Kamoro Jaya",
              "Mawokau Jaya",
              "Nania",
              "Nawaripi"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Deiyai",
        "districts": [
          {
            "name": "Deiyai Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Deiyai I",
              "Kelurahan Deiyai II",
              "Desa Deiyai Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Deiyai Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Dogiyai",
        "districts": [
          {
            "name": "Dogiyai Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Dogiyai I",
              "Kelurahan Dogiyai II",
              "Desa Dogiyai Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Dogiyai Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Intan Jaya",
        "districts": [
          {
            "name": "Intan Jaya Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Intan Jaya I",
              "Kelurahan Intan Jaya II",
              "Desa Intan Jaya Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Intan Jaya Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Mimika",
        "districts": [
          {
            "name": "Mimika Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Mimika I",
              "Kelurahan Mimika II",
              "Desa Mimika Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Mimika Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Paniai",
        "districts": [
          {
            "name": "Paniai Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Paniai I",
              "Kelurahan Paniai II",
              "Desa Paniai Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Paniai Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Puncak",
        "districts": [
          {
            "name": "Puncak Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Puncak I",
              "Kelurahan Puncak II",
              "Desa Puncak Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Puncak Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      },
      {
        "name": "Kabupaten Puncak Jaya",
        "districts": [
          {
            "name": "Puncak Jaya Kota",
            "postalCode": "10000",
            "villages": [
              "Kelurahan Puncak Jaya I",
              "Kelurahan Puncak Jaya II",
              "Desa Puncak Jaya Baru",
              "Desa Mekar Jaya"
            ]
          },
          {
            "name": "Puncak Jaya Timur",
            "postalCode": "10001",
            "villages": [
              "Desa Sukamaju",
              "Desa Sukamulya",
              "Desa Harapan Jaya",
              "Desa Sumber Makmur"
            ]
          }
        ]
      }
    ]
  }
];
