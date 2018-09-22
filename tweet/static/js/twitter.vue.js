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
        maxCount: 50,
        remainingCount: 50,
        hasError: false,
        currentSort:'tweet_name',
        currentSortDir:'asc'
      },
      mounted: function() {
        this.getTweets();
      },
      computed:{
        sortedTweets:function() {
          return this.tweets.sort((a,b) => {

            console.log('a', a[this.currentSort]);
            console.log('b', b[this.currentSort]);

            let modifier = 1;
            if(this.currentSortDir === 'desc') modifier = -1;
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
          });
        }
      },
      methods: {
        sort:function(s) {
          if(s === this.currentSort) {
            this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
          }
          this.currentSort = s;
        },
        countdown: function() {
          let currentLen = this.newTweet.tweet_message ? this.newTweet.tweet_message.length : this.currentTweet.tweet_message.length;
          this.remainingCount = this.maxCount - currentLen;
          this.hasError = this.remainingCount < 0;
        },
        formatDate(d) {
          return new Date(d).toLocaleString();
        },
        getTweets: function() {
          let api_url = '/api/tweet/';
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
