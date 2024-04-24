const Footer = () => {
return (
	<footer className="site-footer">
		<div className="site-footer__info">
			<h3>Sources</h3>
			<ul className="list-sources">
				<li className="source__gnews"><a href="https://gnews.io/"><img src="https://gnews.io/assets/images/logo-black.svg" alt="Logo for GNews" /></a></li>
			</ul>
		</div>
		<div className="site-footer__credits">
			<ul className="list-credits">
				<li><a href="mailto:info@theyoricktouch.com"><i className="fa fa-envelope"></i><span className="screen-reader-only">Email</span></a></li>
				<li><a href="https://twitter.com/kciroy"><i className="fa-brands fa-x-twitter"></i><span className="screen-reader-only">X formerly known as Twitter</span></a></li>
				<li><a href="https://uk.linkedin.com/in/theyoricktouch/"><i className="fa fa-linkedin"></i><span className="screen-reader-only">LinkedIn</span></a></li>
				<li><a href="https://github.com/yodiyo"><i className="fa fa-github"></i><span className="screen-reader-only">Github</span></a></li>
			</ul>
			<p className="site-copyright">&copy; Yorick Brown 2024</p>
		</div>
	</footer>
	);
}

export default Footer;
