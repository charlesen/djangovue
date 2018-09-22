Vue.http.headers.common['X-CSRFToken'] = "{{ csrf_token }}";
    new Vue({
      el: '#root',
      delimiters: ['${','}'],
      data: {
        tweets: [],
        loading: true,
        currentTweet: {},
        message: null,
        newTweet: { 'tweet_name': null, 'tweet_message': null },
        search_term: '',
      },
      mounted: function() {
        this.getTweets();
      },
      methods: {
        getTweets: function() {
          let api_url = '/api/tweet/';
          if(this.search_term!==''||this.search_term!==null) {
            api_url = `/api/tweet/?search=${this.search_term}`
          }
          this.loading = true;
          this.$http.get(api_url)
              .then((response) => {
                this.tweets = response.data;
                this.loading = false;
              })
              .catch((err) => {
                this.loading = false;
                console.log(err);
              })
        },
        getTweet: function(id) {
          this.loading = true;
          this.$http.get(`/api/tweet/${id}/`)
              .then((response) => {
                this.currentTweet = response.data;
                $("#editTweetModal").modal('show');
                this.loading = false;
              })
              .catch((err) => {
                this.loading = false;
                console.log(err);
              })
        },
        addTweet: function() {
          this.loading = true;
          this.$http.post('/api/tweet/',this.newTweet)
              .then((response) => {
                this.loading = true;
                this.getTweets();
                $('#addTweetModal').modal('hide');
              })
              .catch((err) => {
                this.loading = true;
                console.log(err);
              })
        },
        updateTweet: function() {
          this.loading = true;
          this.$http.put(`/api/tweet/${this.currentTweet.tweet_id}/`, this.currentTweet)
              .then((response) => {
                this.loading = false;
                this.currentTweet = response.data;
                this.getTweets();
                $('#editTweetModal').modal('hide');
              })
              .catch((err) => {
                this.loading = false;
                console.log(err);
              })
        },
        deleteTweet: function(id) {
          this.loading = true;
          this.$http.delete(`/api/tweet/${id}/`)
              .then((response) => {
                this.loading = false;
                this.getTweets();
              })
              .catch((err) => {
                this.loading = false;
                console.log(err);
              })
        }
      }
    });
