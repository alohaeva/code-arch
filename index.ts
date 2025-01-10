import { DIContainer } from "./src/utils/DIContainer";

async function main() {
    // Create dependencies and use cases
    const createUserUseCase = DIContainer.useCases.createUserUseCase();
    const purgeCacheAndNotifyUsersUseCase = DIContainer.useCases.purgeCacheAndNotifyUsersUseCase();
    const createProjectUseCase = DIContainer.useCases.createProjectUseCase();
    const getProjectsOfUserUseCase = DIContainer.useCases.getProjectsOfUserUseCase();
    const approveProjectUseCase = DIContainer.useCases.approveProjectUseCase();
    const notifyProjectOwnerUseCase = DIContainer.useCases.notifyProjectOwnerUseCase();

    // Step 1: Create users
    await createUserUseCase.execute("1", "Alice", "alice@example.com", "admin");

    // Step 2: Create a project for Alice
    await createProjectUseCase.execute("1", "101", "Project Alpha", "First project by Alice");

    // Step 3: Fetch and display Alice's projects
    const projects = await getProjectsOfUserUseCase.execute("1");
    console.log("Projects for user 'Alice':", projects.map((p) => p.name));

    // Purge cache and notify users
    await purgeCacheAndNotifyUsersUseCase.execute("https://example.com");

    const projectId = "123";

    console.log("Starting full project approval flow...");
    await approveProjectUseCase.execute(projectId);

    console.log("Sending independent notification to the project owner...");
    await notifyProjectOwnerUseCase.execute(projectId);
}

main().then(() => {
    console.log('executed');
});