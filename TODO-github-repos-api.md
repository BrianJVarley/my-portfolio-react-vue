# TODO: GitHub Repos REST API Service

Implement a service to fetch GitHub repositories from the public GitHub API and use it in the portfolio app.

## Goals

- Add a reusable REST API service for GitHub repo data
- Use the public GitHub API (`https://api.github.com/users/{username}/repos`)
- Keep the service separate from the existing local `projects` service
- Display fetched repos in the portfolio UI or use them for a new section

## Tasks

1. Create a GitHub API service
   - Add `react-mfe/src/services/github.ts`
   - Export a typed fetch function such as `getGithubRepos(username: string)`
   - Use `fetch()` to call `https://api.github.com/users/${username}/repos`
   - Add request error handling and JSON parsing
   - Add TypeScript types for the GitHub repo response

2. Add a query hook for GitHub repos
   - Use `@tanstack/react-query` in a new hook or inside `ProjectsPage`
   - Add a query key like `['github-repos', username]`
   - Configure staleTime/cacheTime for GitHub requests
   - Add loading and error states in the UI

3. Integrate into the UI
   - Option A: add a new repo list section inside `react-mfe/src/ProjectsPage.tsx`
   - Option B: create a new page or component for GitHub repos
   - Display repo name, description, stars, language, and link
   - Optionally add a `View on GitHub` button per repo

4. Add configuration for the GitHub username
   - Hardcode a username in the service or query for now
   - Later: make the username editable from settings or environment variables

5. Add documentation
   - Update `README.md` with the new GitHub repo section
   - Document how to change the username and how to run the feature

## Future enhancements

- Add filtering by language or repo type
- Add caching and refetch on demand
- Add pagination for large repo lists
- Add an option to show `pinned` or selected repos only
- Fall back to local `projects` data if GitHub API rate limits are reached
