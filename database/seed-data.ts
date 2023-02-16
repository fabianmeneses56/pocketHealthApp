interface subcategory {
  title: string
}

interface seedCategories {
  title: string
  subcategories: subcategory[]
}
interface SeedData {
  categories: seedCategories[]
}

export const initialData: SeedData = {
  categories: [
    {
      title: 'Supermercado',
      subcategories: [
        { title: 'Almacén' },
        { title: 'Verdulería' },
        { title: 'Carnicería' },
        { title: 'Delivery' },
        { title: 'Artículos Limpieza' },
        { title: 'S - Otros' }
      ]
    },
    {
      title: 'Gastos Fijos',
      subcategories: [
        { title: 'Luz' },
        { title: 'Gas ' },
        { title: 'Agua' },
        { title: 'Internet' },
        { title: 'Cable' },
        { title: 'G - Otros' }
      ]
    },
    {
      title: 'Formación',
      subcategories: [
        { title: 'Colegio' },
        { title: 'Material escolar' },
        { title: 'Libros' },
        { title: 'Excursiones' },
        { title: 'Cursos' },
        { title: 'F - Otros' }
      ]
    },
    {
      title: 'Ocio',
      subcategories: [
        { title: 'Vacaciones' },
        { title: 'Paseos' },
        { title: 'Espectáculos' },
        { title: 'Deporte' },
        { title: 'Restaurantes' },
        { title: 'Bares' },
        { title: 'ropa' },
        { title: 'suscripciones' },
        { title: 'O - Otros' }
      ]
    },
    {
      title: 'Transporte',
      subcategories: [
        { title: 'Auto mantenimiento' },
        { title: 'Combustible' },
        { title: 'Garage' },
        { title: 'Taxi/Bus/Tren' },
        { title: 'T - Otros' }
      ]
    },
    {
      title: 'Vivienda',
      subcategories: [
        { title: 'Muebles' },
        { title: 'Electrodomésticos' },
        { title: 'Reparaciones' },
        { title: 'Jardinero' },
        { title: 'Decoración' },
        { title: 'Limpieza' },
        { title: 'V - Otros' }
      ]
    },
    {
      title: 'Salud',
      subcategories: [
        { title: 'Obra Social' },
        { title: 'Farmacia' },
        { title: 'Cuidado Personal' },
        { title: 'Gimnasio' },
        { title: 'Sa - Otros' }
      ]
    }
  ]
}
