export interface ReportDetails {
    id: string;
    type: string;
    title: string;
    date: string;
    content: string;
    likes: number;
    dislikes: number;
    source: string;
}


// --- Mock Data ---

export const MOCK_REPORT_DETAILS: ReportDetails[] = [
    {
        id: '1',
        type: 'Análisis de mercado',
        title: 'Análisis del mercado de criptomonedas',
        date: '2024-06-01',
        content: 'El mercado de criptomonedas ha mostrado una tendencia alcista en las últimas semanas...',
        likes: 120,
        dislikes: 5,
        source: 'Fuente: Informe Financiero Diario'
    },
    {
        id: '2',
        type: 'Análisis de mercado',
        title: 'Impacto de las regulaciones en las criptomonedas',
        date: '2024-06-02',
        content: 'Las nuevas regulaciones gubernamentales están afectando el valor de las criptomonedas...',
        likes: 85,
        dislikes: 10,
        source: 'Fuente: Informe Financiero Diario'
    },
    {
        id: '20',
        type: 'Análisis Fundamental',
        title: 'Perspectivas a Largo Plazo',
        content: 'A pesar de las fluctuaciones a corto plazo, las perspectivas a largo plazo siguen siendo optimistas debido a la adopción creciente y los desarrollos tecnológicos en el sector.',
        date: '2024-05-15',
        likes: 200,
        dislikes: 15,
        source: "Fuente: Informe Financiero Diario"
    },

];