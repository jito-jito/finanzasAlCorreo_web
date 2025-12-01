export interface DailyReport {
    date: Date;
    BTCPrice: number;
    ETHPrice: number;
    reports: reportItem[];

}

export interface reportItem {
    id: string;
    title: string;
    date: string;
    content: string;
    likes: number;
    dislikes: number;
}



// --- Mock Data ---

export const MOCK_DAILY_REPORT: DailyReport = {
    date: new Date(),
    BTCPrice: 45000,
    ETHPrice: 3000,
    reports: [
        {
            id: '1',
            title: 'Análisis del mercado de criptomonedas',
            date: '2024-06-01',
            content: 'El mercado de criptomonedas ha mostrado una tendencia alcista en las últimas semanas...',
            likes: 120,
            dislikes: 5
        },
        {
            id: '2',
            title: 'Impacto de las regulaciones en las criptomonedas',
            date: '2024-06-02',
            content: 'Las nuevas regulaciones gubernamentales están afectando el valor de las criptomonedas...',
            likes: 85,
            dislikes: 10
        }
    ]
};