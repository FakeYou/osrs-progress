function saveState(key, data) {
		    localStorage.setItem(key, JSON.stringify(data));
		}

		function getSavedState(key) {
		    const savedState = localStorage.getItem(key);

		    return savedState ? JSON.parse(savedState) : null;
		}

		const saveStateStorage = {
			    watch: {
			        '$data': {
			            handler() {
			                this.saveState();
			            },
			            deep: true,
			        },
			    },

			    created() {
			        this.loadState();
			    },

			    methods: {
			        loadState() {
			            const savedState = getSavedState(this.getSaveStateConfig().cacheKey);

			            if (!savedState) {
			                return;
			            }

			            _.forEach(savedState, (value, key) => {

			                if (this.attributeIsManagedBySaveState(key)) {
			                    this.$data[key] = value;
			                }
			            });
			        },

			        saveState() {
			            const data = _.pickBy(this.$data, (value, attribute) => {
			                return this.attributeIsManagedBySaveState(attribute);
			            });

			            saveState(this.getSaveStateConfig().cacheKey, data);
			        },

			        attributeIsManagedBySaveState(attribute) {
			            if (! this.getSaveStateConfig().saveProperties) {
			                return true;
			            }

			            return this.getSaveStateConfig().saveProperties.indexOf(attribute) !== -1;
			        },
			    },
			};