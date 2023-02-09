<template>
    <div id="pop-up">
        <div class="mod-loading" v-if="isshow">
            <div class="cell-loading">
                <span class="loading"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loading',
    props: {
        isshow: {
            type: Boolean,
        }
    }

}
</script>

<style scoped lang="scss">
#pop-up {

    .mod-loading {
        position: fixed;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
        background-color: transparent;

        .cell-loading {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            width: 100px;
            background-color: rgba(0, 0, 0, 0.3);

            span.loading {
                position: relative;
                width: 30px;
                height: 30px;
                border: 2px solid #fff;
                border-top-color: rgba(0, 0, 0, 0.2);
                border-right-color: rgba(0, 0, 0, 0.2);
                border-bottom-color: rgba(0, 0, 0, 0.2);
                border-radius: 100%;
                animation: circle infinite 0.75s linear;

                @keyframes circle {
                    0% {
                        transform: rotate(0);
                    }

                    100% {
                        transform: rotate(360deg);
                    }
                }
            }

        }
    }
}
</style>