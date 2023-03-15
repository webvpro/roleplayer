<template>
    <div class="bg-lightest-blue vh-100 pa3 tc">
      <h2 class="ttc">Magic URL with Appwrite</h2>
      <div class="br3 bg-navy ba near-white b--black-10 shadow-3 w-100 w-60-m w-30-l mw6 center mt5 ph4 pv3 h5">
        <p class="f3">Verify Magic URL</p>
        <p>To complete this session, please verify your magic URL by clicking the verification button.</p>
          <button class="link br3 pv2 ph2 mt3 dib black fw6 bg-white ba b--navy pointer inline-flex items-center hover-bg-lightest-blue" @click="verifyURL">
            <span class="f4 ml2 pr2">Verify magic URL</span>
          </button>
      </div>
    </div>
  </template>
  <script setup>
    const { verifyMagicURL } = useAuth()
    const verifyURL = async () => {
        await verifyMagicURL(window.location.search)
    }
  </script>