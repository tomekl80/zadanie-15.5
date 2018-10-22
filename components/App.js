'use strict';

App = React.createClass({

	getInitialState() {
		return {
			loading: false,
			searchingText: '',
			gif: {}
		};
	},

	handleSearch: function (searchingText) {
		this.setState({
			loading: true
		});
		this.getGif(searchingText)
			.then(gif => {
				this.setState({
					loading: false,
					gif: gif,
					searchingText: searchingText
				});
			})
			.catch(error => {
				console.log('Nie można załadować GIF\'a');
			});
	},

	// Promise code
	getGif: function (searchingText) {
		return new Promise( function (resolve, reject) {
			var GIPHY_API_URL = 'https://api.giphy.com';
			var GIPHY_PUB_KEY = 'c99uC8NT2BE1n9OUkA3vth02sU30II5k';
			var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
			var xhr = new XMLHttpRequest();

			xhr.onload = function() {
				var data = JSON.parse(xhr.responseText).data;
				var gif = {
					url: data.fixed_width_downsampled_url,
					sourceUrl: data.url
				};
				
				if (xhr.status === 200) {
					resolve(gif);
				} else {
					reject(error);
				}
			};

			xhr.open('GET', url);
			xhr.send();
		});
	},


	/*getGif: function (searchingText, callback) {
		var GIPHY_API_URL = 'https://api.giphy.com';
		var GIPHY_PUB_KEY = 'c99uC8NT2BE1n9OUkA3vth02sU30II5k';
		var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = function () {
			if (xhr.status === 200) {
				var data = JSON.parse(xhr.responseText).data;
				var gif = {
					url: data.fixed_width_downsampled_url,
					sourceUrl: data.url
				};
				callback(gif);
			}
		};
		xhr.send();
	},*/

	render: function () {
		
		var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

		return (
			<div style={styles}>
					<h1>Wyszukiwarka GIFow!</h1>
					<p>Znajdź gifa na <a href='http://giphy.com'>giphy</a> Naciskaj enter, aby pobrać kolejne gify.</p>
					<Search onSearch={this.handleSearch}/>
				<Gif
					loading={this.state.loading}
					url={this.state.gif.url}
					sourceUrl={this.state.gif.sourceUrl}
				/>
			</div>
		);
	}
});