import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarIcon, ExternalLinkIcon, StarIcon, UsersIcon } from '@heroicons/react/outline';
import SearchIcon from '../icons/SearchIcon';
import IconCode from '../icons/Code';
import IconGitFork from '../icons/GitFork';


interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface Contributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

const ContributorsPage: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [repoLoading, setRepoLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [githubSearch, setGithubSearch] = useState<string>('');

  const themeColors = {
    primary: '#3B82F6', // Blue-500
    secondary: '#8B5CF6', // Purple-500
    accent: '#6366F1', // Indigo-500
    light: '#E0E7FF', // Light blue/purple
    dark: '#1E1B4B' // Dark blue/purple
  };

  const fetchAllRepos = useCallback(async () => {
    setRepoLoading(true);
    setError(null);

    try {
      let allRepos: Repository[] = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await axios.get(
          `https://api.github.com/orgs/asyncapi/repos?per_page=100&page=${page}&sort=updated&direction=desc`,
        );

        if (response.data.length === 0) {
          hasMore = false;
        } else {
          allRepos = [...allRepos, ...response.data];
          page++;
        }
      }

      setRepos(allRepos);
      setFilteredRepos(allRepos);
    } catch (error) {
      console.error('Error fetching repositories:', error);
      setError('Failed to load repositories, API rate limit exceeded. Please try again later.');
    } finally {
      setRepoLoading(false);
    }
  }, []);

  const fetchAllContributors = useCallback(async (repoName: string) => {
    setLoading(true);
    setError(null);

    try {
      let allContributors: Contributor[] = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await axios.get(
          `https://api.github.com/repos/asyncapi/${repoName}/contributors?per_page=100&page=${page}`,
        );

        if (response.data.length === 0) {
          hasMore = false;
        } else {
          allContributors = [...allContributors, ...response.data];
          page++;
        }
      }

      setContributors(allContributors);
    } catch (error) {
      console.error('Error fetching contributors:', error);
      setError('Failed to load contributors. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllRepos();
  }, [fetchAllRepos]);

  useEffect(() => {
    const filtered = repos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description &&
          repo.description.toLowerCase().includes(searchTerm.toLowerCase())),
    );
    setFilteredRepos(filtered);
  }, [searchTerm, repos]);

  useEffect(() => {
    if (!selectedRepo) {
      setContributors([]);
      return;
    }

    fetchAllContributors(selectedRepo);
  }, [selectedRepo, fetchAllContributors]);

  const handleRepoClick = useCallback((repoName: string) => {
    setSelectedRepo(repoName);
  }, []);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const repositoryList = useMemo(() => {
    if (repoLoading) {
      return (
        <div className="flex items-center justify-center h-40">
          <div
            className="animate-spin rounded-full h-10 w-10 border-b-2"
            style={{ borderColor: themeColors.primary }}
          ></div>
        </div>
      );
    }

    if (error) {
      return <div className="text-red-500 text-center py-10">{error}</div>;
    }

    if (repos.length === 0) {
      return (
        <p className="text-gray-500 text-center py-10">No repositories found</p>
      );
    }

    if (filteredRepos.length === 0) {
      return (
        <p className="text-gray-500 text-center py-10">
          No repositories match your search
        </p>
      );
    }

    return (
      <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-1 -mx-2 px-2">
        <AnimatePresence>
          {filteredRepos.map((repo) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleRepoClick(repo.name)}
              className={`p-4 rounded-lg cursor-pointer transition duration-300 border-l-4 ${selectedRepo === repo.name
                ? 'bg-blue-50 border-blue-500'
                : 'hover:bg-gray-50 border-transparent hover:border-gray-200'
                }`}
            >
              <h3 className="font-medium text-lg text-gray-800 break-words">
                {repo.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {repo.description || 'No description'}
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <StarIcon className="h-3.5 w-3.5" style={{ color: themeColors.primary }} />{' '}
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <IconGitFork className="h-3.5 w-3.5" style={{ color: themeColors.primary }} />{' '}
                  {repo.forks_count}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarIcon className="h-3.5 w-3.5" style={{ color: themeColors.primary }} />{' '}
                  {formatDate(repo.updated_at)}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }, [
    repoLoading,
    error,
    repos,
    filteredRepos,
    selectedRepo,
    handleRepoClick,
    formatDate,
    themeColors.primary
  ]);

  const contributorsList = useMemo(() => {
    if (!selectedRepo) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center py-12">
          <UsersIcon className="h-16 w-16 text-gray-300 mb-4" />
          <p className="text-gray-500 max-w-xs">
            Select a repository from the list to view its contributors
          </p>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div
            className="animate-spin rounded-full h-10 w-10 border-b-2"
            style={{ borderColor: themeColors.primary }}
          ></div>
        </div>
      );
    }

    if (error) {
      return <div className="text-red-500 text-center py-10">{error}</div>;
    }

    let filteredContributors = contributors;
    if (githubSearch.trim() !== '') {
      const term = githubSearch.trim().toLowerCase();
      filteredContributors = contributors.filter(c =>
        c.login.toLowerCase().includes(term)
      );
    }

    if (contributors.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <UsersIcon className="h-16 w-16 text-gray-300 mb-4" />
          <p className="text-gray-500">
            No contributors found for this repository
          </p>
        </div>
      );
    }

    if (githubSearch.trim() !== '' && filteredContributors.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <UsersIcon className="h-16 w-16 text-gray-300 mb-4" />
          <p className="text-gray-500">
            No contributor found with username "{githubSearch.trim()}" in this repository.
          </p>
        </div>
      );
    }

    return (
      <>
        <p className="text-sm text-gray-500 mb-4">
          {githubSearch.trim() === ''
            ? `Showing all ${contributors.length} contributors`
            : `Showing results for "${githubSearch.trim()}"`}
        </p>
        <div className="max-h-[65vh] overflow-y-auto pr-1">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredContributors.map((contributor) => (
              <motion.a
                key={contributor.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                }}
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-5 bg-gray-50 rounded-lg transition duration-300 hover:bg-blue-50 border border-gray-200"
              >
                <div className="relative mb-3">
                  <img
                    src={contributor.avatar_url}
                    alt={`${contributor.login}'s avatar`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.webp';
                    }}
                  />
                  <div
                    className="absolute -bottom-1 -right-4 text-xs text-white font-bold rounded-full w-9 h-6 flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: themeColors.secondary }}
                  >
                    {contributor.contributions > 500
                      ? '500+'
                      : contributor.contributions}
                  </div>
                </div>
                <h3 className="font-medium text-gray-800 text-center break-words w-full">
                  {contributor.login}
                </h3>
                <div
                  className="mt-2 flex items-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: themeColors.primary }}
                >
                  View Profile <ExternalLinkIcon className="ml-1 h-3 w-3" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </>
    );
  }, [selectedRepo, loading, error, contributors, githubSearch, themeColors.primary, themeColors.secondary]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 w-full">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative py-16 sm:py-20 overflow-hidden w-full"
        style={{
          background: `linear-gradient(135deg, ${themeColors.dark} 0%, ${themeColors.secondary} 50%, ${themeColors.primary} 100%)`
        }}
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-black"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          ></div>
        </div>
        <div className="w-full px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center z-10 relative">
            <motion.h1
              className="font-black text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              AsyncAPI <span style={{ color: themeColors.light }}>Contributors</span>
            </motion.h1>
            <motion.div
              className="w-16 sm:w-24 h-1 rounded-full mb-4 sm:mb-6"
              style={{ backgroundColor: themeColors.light }}
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>
            <motion.p
              className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-blue-100 max-w-4xl leading-relaxed px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Explore AsyncAPI repositories and their amazing contributors. Browse
              our open source projects and discover the developers building the future
              of event-driven architectures.
            </motion.p>
          </div>
        </div>
      </motion.section>

      <div className="w-full px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-8 relative w-full"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-3 pl-12 border border-gray-200 rounded-full focus:outline-none focus:ring-2 shadow-sm bg-white text-gray-700 focus:ring-[${themeColors.primary}]`}
            />
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Showing {filteredRepos.length} repositories.
          </p>
        </motion.div>

        <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 max-w-[95rem] mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="xl:col-span-4 bg-white rounded-xl shadow-lg p-6 overflow-hidden border border-gray-200 w-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="p-3 rounded-full text-white shadow-lg"
                style={{ backgroundColor: themeColors.primary }}
              >
                <IconCode className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Repositories
              </h2>
            </div>

            {repositoryList}
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="xl:col-span-8 bg-white rounded-xl shadow-lg p-6 overflow-hidden border border-gray-200 w-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="p-3 rounded-full text-white shadow-lg"
                style={{ backgroundColor: themeColors.secondary }}
              >
                <UsersIcon className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedRepo ? (
                  <div>
                    Contributors for {' '}
                    <span onClick={() => {
                      window.open(`https://github.com/asyncapi/${selectedRepo}`);
                    }} className="text-blue-600 hover:text-blue-700 cursor-pointer underline">{selectedRepo}</span>
                  </div>
                ) : (
                  <div>
                    Select a repository
                  </div>
                )}
              </h2>
            </div>
            {selectedRepo && (
              <div className="mb-6 max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search by GitHub username..."
                  value={githubSearch}
                  onChange={e => setGithubSearch(e.target.value)}
                  className={`w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 shadow-sm bg-white text-gray-700 focus:ring-[${themeColors.secondary}]`}
                />
              </div>
            )}
            {contributorsList}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContributorsPage;