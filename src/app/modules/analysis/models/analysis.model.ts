export interface AnalysisData {
    metricsItems: MetricsItem[];
    analysisItems: AnalysisItem[];
}


export interface MetricsItem {
    id: string;
    title: string;
    summary: string;
    description: string;
}
export interface AnalysisItem {
    id: string;
    type: string;
    title: string;
    date: string;
    content: string;
    likes: number;
    dislikes: number;
}

export const DEFAULT_ANALYSIS_DATA: AnalysisData = {
    metricsItems: [
        {
            id: '1',
            title: '(All-Time High) / Drawdown',
            summary: '85%',
            description: 'Indica cuánto ha caído el precio desde su punto máximo histórico.',
        },
        {
            id: '2',
            title: 'RSI (Relative Strength Index)',
            summary: '70',
            description: 'Identifica condiciones de sobrecompra o sobreventa.',
        },
        {
            id: '3',
            title: 'Ratio Volumen / Market Cap (Vol/MC)',
            summary: 'Alta Liquidez',
            description: 'Esta métrica revela si el interés en la moneda es real o artificial.',
        },
    ],
    analysisItems: [
        {
            id: '15',
            type: 'Análisis Técnico',
            title: 'Análisis del Mercado Actual',
            content: 'El mercado muestra señales mixtas con una volatilidad moderada. Los inversores deben estar atentos a las tendencias emergentes y considerar estrategias de diversificación.',
            date: '2024-04-01',
            likes: 120,
            dislikes: 10,
        },
        {
            id: '20',
            type: 'Análisis Fundamental',
            title: 'Perspectivas a Largo Plazo',
            content: 'A pesar de las fluctuaciones a corto plazo, las perspectivas a largo plazo siguen siendo optimistas debido a la adopción creciente y los desarrollos tecnológicos en el sector.',
            date: '2024-05-15',
            likes: 200,
            dislikes: 15,
        },
    ],
};  