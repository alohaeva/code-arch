# General Overview of the Architecture

This architecture follows the principles of **clean architecture** and **separation of concerns**, introducing clear responsibilities across factories, validation services, use cases, repositories, and entities. Here's how the different layers work together:

1. **Entities**: Represent the core data model with limited intrinsic behavior. These objects encapsulate business data, such as `User` or `Project`, but are unaware of external dependencies or systems.
2. **Factories**: Handle the **creation logic** of entities. They encapsulate default fields, relationships, and any initialization logic required to create valid entities.
3. **Validation Services**: Enforce all validation rules for entities. They ensure data integrity and enforce business rules, decoupling validation logic from use cases and factories.
4. **Domain Services**: Handle shared business logic across entities or complex workflows.
5. **Use Cases**: Orchestrate workflows. They validate data through validation services, delegate entity creation to factories, and interact with repositories for persistence or data fetching.
6. **Repositories**: Serve as the interface between the domain and persistence/infrastructure layers. They handle communication with the database or storage systems but don’t handle business or creation/validation logic.

### Workflow Example

1. A **use case** receives input from a controller (e.g., an API).
2. The **validation service** checks that the inputs comply with business constraints.
3. If validation passes, the use case uses a **factory** to create the domain entity.
4. The perfected entity is passed to the **repository** for storage or further processing.
5. The repository performs low-level interactions with the data layer (e.g., databases).

### Pros of the Architecture

#### 1. Separation of Concerns

Each part of the system has a single responsibility:
- Factories focus on creation.
- Validation services enforce correctness.
- Use cases organize workflows.
- Repositories manage persistence.

#### 2. Reusability

- **Factories** and **validation services** are reusable across multiple use cases.
- New workflows can integrate the same validation and creation logic without duplication.

#### 3. Testability

- Each layer can be tested in isolation:
- Validation services can be unit tested for input validation.
- Factories can be tested for correct entity creation.
- Use cases can be tested for processing workflows.
- Repositories can be mocked, making tests fast.

#### 4. Scalability

This architecture can grow with system scale:
- Complex validation rules can evolve without affecting other layers.
- Adding new workflows or modifying existing use cases is straightforward.

#### 5. Decoupling

Use cases, validation services, and factories are decoupled from external systems like databases. This makes it easier to swap out infrastructure (e.g., change the storage mechanism) without affecting the domain layer.

#### 6. Adherence to Clean Architecture

It embodies the Dependency Inversion principle from the SOLID principles:
- High-level policies (use cases) depend on abstractions (interfaces for validation, factories, repositories), not low-level details.

### Cons of the Architecture

#### 1. Increased Complexity for Small Projects

- Adding multiple layers like factories, validation services, and repositories can feel like over-engineering for small or simple applications.

#### 2. Boilerplate Code

- Every entity needs its own factory, validation service, and repository interface/implementation, which can introduce a lot of repetitive scaffolding code.

#### 3. Performance Overhead

- Delegating responsibilities across multiple layers may introduce slight performance overhead, especially for workflows that require minimal processing.

#### 4. Requires Strong Understanding of Architecture

- Teams unfamiliar with clean architecture may struggle to implement or maintain this structure due to misunderstandings of layer boundaries.

#### 5. Potential for Circular Dependencies

- Improper management of dependencies (e.g., factories depending on repositories or validators) can result in circular dependencies, which are especially difficult to debug and resolve.

### Avoiding Circular Dependencies

Read the guide [here](./AvoidCircularDeps.md)

### Not to bind Entity creation and Repository

Read guide [here](./DoNotCreateEntityInRepository.md)

### Separate Entities Building logic and Validation Services with complex instantiating logic

Incorporating **factories** for entity creation and **validation services** for entity validation leads to a more structured, maintainable, and scalable architecture.

#### 1. Factory Responsibility:
- Encapsulates the **logic for instantiating entities**.
- Handles default values, relationships, and other initialization logic.
- Keeps entity creation logic out of use cases and repositories.

#### 2. Validation Service Responsibility:
- Enforces validation rules for entities.
- Ensures proper constraints and business logic during creation or state changes.

#### 3. Use Case Responsibility:
- Coordinates workflows and delegates creation to the factory and validation to the validation service.

**Advantages:**

- **Simpler use cases** (delegation of creation and validation logic).
- **Reusable factories and validation services** across multiple workflows.
- Improved adherence to **Single Responsibility Principle (SRP)**.

### Disadvantages of Introducing Factories and Validation Services
While this approach adds clarity and modularity, there are trade-offs:

#### 1. Increased Complexity
- Introducing factories and validation services adds extra layers of indirection and complexity to the system.
- Developers must manage and understand these additional abstractions.

#### 2. More Boilerplate Code
- Factories and services increase the amount of boilerplate code, especially in smaller projects.

#### 3. Overhead for Simple Entities
- For simple entities with little initialization or validation logic, factories and validation services may be unnecessary and add overhead.

#### 4. Possible Over-Engineering
- In small applications or projects with minimal entity creation rules/complexity, this level of abstraction might be excessive.

#### 5. Difficult Debugging
- With multiple layers (use case → validation service → factory → repository), debugging involves tracing through multiple layers of code.

This approach is best suited for:
1. **Complex Applications**: Where entities have interdependent logic, default values, and derived fields.
2. **Extensive Business Rules**: Where validation logic becomes too complex to reside in simple condition checks.
3. **Reusability Across Use Cases**: If the same entities are initialized and validated in multiple workflows.

### Considerations for continued development

#### Modular Validation Logic

If multiple entities share similar validation rules, modularize the logic by creating reusable validation utilities rather than overloading individual validators.

#### Introduce Domain Services for Shared Business Logic

If you notice that certain workflows overlap across use cases (e.g., rules for assigning a `Project` to a `User`), use **domain services**:
- Domain services encapsulate high-level business logic that operates on multiple entities.
- This prevents bloating individual entities or duplicating logic across use cases or validation services.

#### Simplify Factories for Static Entities

For entities that do not require complex initialization, use static creation methods on the entity itself instead of separate factories.

#### Combine Factories for Packages
If you frequently create grouped entities (e.g., a `User` with a default `Profile`), introduce higher-order factories that encapsulate multiple creations:

#### Break Down Large Validators
For complex entities with many validation rules, break the validator into smaller, composable rules. Use a **Rule Composition Pattern**:
- **Single Responsibility Rule Validators:** Each validation function enforces a single rule.
- **Composition:** Combine rules dynamically to create more flexible validators.

#### Limit Repository Scope
Ensure repositories remain focused on **data access**:
- Avoid passing raw data into repositories; give them fully-formed entities created by factories.
- Do **not add logic for validation or initialization** within repositories.


#### Pipeline Patterns:
- If the process has many more steps, consider implementing a "task pipeline" pattern to simplify step flows.

#### Extend Notifications:
- Extend `NotificationService` to send multiple types of notifications (e.g., email, SMS, push notifications).

#### Error Handling:
- Introduce error recovery mechanisms for partially completed workflows (such as retrying notifications).