const Building: { [key: string]: { short_name: string; long_name: string } } = {
    TA: { short_name: "TA", long_name: "Taller de Artes Graficas" },
    T: { short_name: "T", long_name: "Terrats" },
    SH: { short_name: "SH", long_name: "Efraín Sánchez Hidalgo" },
    SA: { short_name: "SA", long_name: "Sanchez Hall" },
    S: { short_name: "S", long_name: "Luis Stefani" },
    RA: { short_name: "RA", long_name: "Alfredo Ramirez de Arellano" },
    Q: { short_name: "Q", long_name: "Quimica" },
    PS: { short_name: "PS", long_name: "Pista Sintetica" },
    PA: { short_name: "PA", long_name: "Pista Alumni" },
    P: { short_name: "P", long_name: "Jesus T Pinero" },
    MG: { short_name: "MG", long_name: "Isla Magueyes" },
    MI: { short_name: "MI", long_name: "Miradero (Artes Plasticas)" },
    M: { short_name: "M", long_name: "Monzon (Matematicas)" },
    L: { short_name: "L", long_name: "Antonio Luchetti" },
    IQ: { short_name: "IQ", long_name: "Ingenieria Quimica" },
    IP: { short_name: "IP", long_name: "Invernadero Industria Pecuaria" },
    IH: { short_name: "IH", long_name: "Invernaedro Horticultura" },
    IC: { short_name: "IC", long_name: "Invernadero Proteccion de Cultivos" },
    II: { short_name: "II", long_name: "Ingenieria Industrial" },
    IB1: { short_name: "IB-1", long_name: "Instruccion Bibliotecaria" },
    IB2: { short_name: "IB-2", long_name: "Instruccion Bibliotecaria" },
    IA: { short_name: "IA", long_name: "Invernadero de Horticultura" },
    HO: { short_name: "HO", long_name: "Hospital" },
    GE: { short_name: "GE", long_name: "Gimnasio Angel F Espada" },
    FI: { short_name: "FI", long_name: "Otras Fincas" },
    F: { short_name: "F", long_name: "Fisica, Geologia y Ciencias Marinas" },
    EP: { short_name: "EP", long_name: "Escuela Publica" },
    EN: { short_name: "EN", long_name: "Laboratorio de Entomologia" },
    EL: { short_name: "EL", long_name: "Estacion de Lajas" },
    EI: { short_name: "EI", long_name: "Estacion de Isabela" },
    EE: { short_name: "EE", long_name: "Edificio de Enfermeria" },
    EA: { short_name: "EA", long_name: "Estudios Aerospaciales" },
    CT: { short_name: "CT", long_name: "Cancha de Tenis" },
    CS: { short_name: "CS", long_name: "Cancha de Softball" },
    CM: { short_name: "CM", long_name: "Coliseo Mangual" },
    CI: { short_name: "CI", long_name: "Ingenieria Civil" },
    CH: { short_name: "CH", long_name: "Chardon" },
    CD: { short_name: "CD", long_name: "Centro de Investigacion y Desarrollo (CID)" },
    CA: { short_name: "CA", long_name: "Campo Atlético" },
    C: { short_name: "C", long_name: "Celis" },
    B: { short_name: "B", long_name: "Biologia" },
    AZ: { short_name: "AZ", long_name: "Finca Alzamora" },
    AR: { short_name: "AR", long_name: "Artes Plasticas" },
    AP: { short_name: "AP", long_name: "Anexo Pinero" },
    AM: { short_name: "AM", long_name: "Ingenieria Agricola" },
    AI: { short_name: "AI", long_name: "Antiguo Instituto" },
    AE: { short_name: "AE", long_name: "Administracion de Empresas" },
};

const ValidBuildings = Object.keys(Building).map((key) => Building[key].short_name);

export { Building, ValidBuildings };