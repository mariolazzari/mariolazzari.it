import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";

const Meta = props => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: props.title });
  const href = `https://mariolazzari.it/${props.canonical}`;
  const content =
    "programmazione javascript typescript react redux nodejs mongodb web developer brescia milano competenze skill";

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <link rel="canonical" href={href} />
      <meta name="description" content={title} />
      <meta name="keywords" content={content} />
    </Helmet>
  );
};

Meta.propTypes = {
  title: PropTypes.string.isRequired,
  canonical: PropTypes.string.isRequired,
};

export default Meta;
