export type newsType = {
    content: string,
    createdAt: string,
    id: number,
    title: string,
    updatedAt: string
}

export type ThemeType = {
    id: number,
    name: string, 
    mainColor: string,
    secondColor: string,
    title: string,
    textColor: string
}

export type StoreStateType = {
    news: newsType[];
    currentTheme: ThemeType;
    darkTheme: ThemeType;
    lightTheme: ThemeType;
    blueTheme: ThemeType;
}