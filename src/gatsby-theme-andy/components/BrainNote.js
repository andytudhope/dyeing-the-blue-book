import React from 'react';
import { Link } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { MDXProvider } from '@mdx-js/react';
import { LinkToStacked } from 'react-stacked-pages-hook';

import components from 'gatsby-theme-andy/src/components/MdxComponents';
import useWindowWidth from '../../utils/useWindowWidth';

const BrainNote = ({ note }) => {
  const [width] = useWindowWidth();
  let references = [];
  let referenceBlock;
  if (note.inboundReferenceNotes != null) {
    const RefLink = width < 768 ? Link : LinkToStacked;
    references = note.inboundReferenceNotes.map((reference) => (
      <RefLink
        className="no-underline hover:text-gray-700"
        to={reference.slug === 'about' ? `about` : `/${reference.slug}`} // hack
        key={reference.slug}
      >
        <div className="py-2">
          <h5 className="">{reference.title}</h5>
          <p className="text-sm m-0">{reference.childMdx.excerpt}</p>
        </div>
      </RefLink>
    ));

    if (references.length > 0) {
      referenceBlock = (
        <>
          <h3>Referenced in</h3>
          <div className="mb-4">{references}</div>
          <hr className="mx-auto w-32" />
        </>
      );
    }
  }

  const popups = {};
  if (note.outboundReferenceNotes) {
    note.outboundReferenceNotes
      .filter((reference) => !!reference.childMdx.excerpt)
      .forEach((ln, i) => {
        popups[ln.slug] = (
          <div
            id={ln.slug}
            className="w-64 p-4 bg-gray-100 rounded-lg shadow-lg border border-blue-200"
          >
            <h5 className="mb-2">{ln.title}</h5>
            <p className="text-sm text-gray-900">{ln.childMdx.excerpt}</p>
          </div>
        );
      });
  }

  const AnchorTagWithPopups = (props) => (
    <components.a {...props} popups={popups} noPopups={width < 768} />
  );

  return (
    <MDXProvider components={{ a: AnchorTagWithPopups }}>
      <div className="flex-1">
        <h1 className="my-4">{note.title}</h1>
        <MDXRenderer>{note.childMdx.body}</MDXRenderer>
      </div>
      <div className="refs-box bg-gray-900 text-gray-600 rounded-lg mb-4 p-4">
            {referenceBlock}
            <p className="text-sm m-0">
              Explore the full {' '}
              <a href="https://www.youtube.com/playlist?list=PL5ClmaG2tnPM3sgzhHmEhxitzdX0latyD" target="_blank" rel="noopener noreferrer">
                YouTube playlist
              </a>{' '} or {' '}
              <a href="https://www.youtube.com/playlist?list=PL5ClmaG2tnPNgqWDBGCWAQxD0sYpbfPRK" target="_blank" rel="noopener noreferrer">
                The Blue Book playlist
              </a>{' '} or the {' '}
              <a href="https://www.youtube.com/playlist?list=PL5ClmaG2tnPOSeeVkPwtLIh5UjjFHcTKj" target="_blank" rel="noopener noreferrer">
                Living playlist
              </a>. You can also @ me on{' '}
              <a href="https://twitter.com/cryptowanderer" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>{' '} with any questions.
            </p>
          </div>
    </MDXProvider>
  );
};

export default BrainNote;