export default async function HealthPage() {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await response.json();

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                        Welcome to the Health Page
                    </h1>
                    <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        This is the health page of the app. You can use this page to check the health of this
                        application.
                    </p>
                    <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">title: {data.title}</p>
                    <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        completed: {data.completed.toString()}
                    </p>
                </div>
            </main>
        </div>
    );
}
