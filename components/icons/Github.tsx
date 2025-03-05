import React from 'react';

export default function IconGithub({ className = '' }) {
  return (
    <img
      src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      alt="GitHub Logo"
      className={className}
      width={40} // Adjust size as needed
      height={40}
    />
  );
}
