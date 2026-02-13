// 页面切换功能
function showSection(sectionId) {
    // 隐藏所有部分
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    // 显示目标部分
    document.getElementById(sectionId).classList.add('active');
}

// 照片数组
const photos = [
    '微信图片_20260213180953_250_2.jpg',
    '微信图片_20260213180954_251_2.jpg',
    '微信图片_20260213180955_252_2.jpg',
    '微信图片_20260213180956_253_2.jpg',
    '微信图片_20260213180956_254_2.jpg',
    '微信图片_20260213180957_255_2.jpg',
    '微信图片_20260213180958_256_2.jpg',
    '微信图片_20260213180959_257_2.jpg',
    '微信图片_20260213180959_258_2.jpg',
    '微信图片_20260213181000_259_2.jpg',
    '微信图片_20260213181001_260_2.jpg',
    '微信图片_20260213181002_261_2.jpg',
    '微信图片_20260213181002_262_2.jpg',
    '微信图片_20260213181003_263_2.jpg',
    '微信图片_20260213181004_264_2.jpg'
];

// 初始化页面切换事件
function initPageNavigation() {
    // 开始按钮
    document.getElementById('start-btn').addEventListener('click', () => {
        showSection('game-section');
        // 显示游戏页面时初始化气球游戏
        try {
            initBalloonGame();
            console.log('气球游戏已初始化');
        } catch (e) {
            console.error('初始化气球游戏失败:', e);
        }
    });

    // 游戏到祝福
    document.getElementById('next-to-wish').addEventListener('click', () => {
        showSection('wish-section');
    });

    // 祝福到游戏
    document.getElementById('back-to-game').addEventListener('click', () => {
        showSection('game-section');
    });

    // 祝福到照片
    document.getElementById('next-to-photo').addEventListener('click', () => {
        showSection('photo-section');
    });

    // 照片到祝福
    document.getElementById('back-to-wish').addEventListener('click', () => {
        showSection('wish-section');
    });

    // 开始游戏按钮不需要在这里添加监听器，因为initBalloonGame函数内部会处理

    // 跳过游戏按钮
    const skipGameBtn = document.getElementById('skip-game');
    if (skipGameBtn) {
        skipGameBtn.addEventListener('click', () => {
            showSection('wish-section');
        });
    }
}

// 气球游戏
function initBalloonGame() {
    console.log('开始初始化气球游戏');
    const container = document.getElementById('balloon-container');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const gameResultElement = document.getElementById('game-result');
    const startGameBtn = document.getElementById('start-game');
    const nextToWishBtn = document.getElementById('next-to-wish');
    let score = 0;
    let timeLeft = 60;
    let balloonInterval;
    let timerInterval;
    
    // 音效功能已移除

    console.log('气球游戏初始化', container, scoreElement, timerElement);
    
    // 确保容器存在
    if (!container) {
        console.error('气球容器不存在');
        return;
    }

    // 初始化游戏状态
    function initGameState() {
        // 清空容器
        container.innerHTML = '';
        
        // 重置分数
        score = 0;
        if (scoreElement) {
            scoreElement.textContent = '0';
        }
        
        // 重置时间
        timeLeft = 60;
        if (timerElement) {
            timerElement.textContent = '60';
        }
        
        // 清空游戏结果
        if (gameResultElement) {
            gameResultElement.textContent = '';
            gameResultElement.className = 'game-result';
        }
        
        // 显示开始游戏按钮，隐藏下一步按钮
        if (startGameBtn) {
            startGameBtn.style.display = 'inline-block';
        }
        if (nextToWishBtn) {
            nextToWishBtn.style.display = 'none';
        }
        
        // 移除game-started类，显示提示文字
        container.classList.remove('game-started');
        console.log('游戏状态已重置，移除game-started类');
    }

    // 创建气球
    function createBalloon() {
        console.log('创建气球');
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        
        // 随机大小
        const size = Math.random() * 30 + 40; // 40-70px
        balloon.style.width = size + 'px';
        balloon.style.height = size * 1.5 + 'px';
        
        // 动画持续时间
        const duration = Math.random() * 3 + 2; // 2-5秒
        
        // 随机位置（在容器内水平居中随机）
        const containerWidth = container.offsetWidth;
        const x = Math.random() * (containerWidth - size - 40) + 20;
        const y = container.offsetHeight + 50; // 从底部外开始
        
        balloon.style.position = 'absolute';
        balloon.style.left = x + 'px';
        balloon.style.top = y + 'px';
        balloon.style.opacity = '1';
        balloon.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
        
        // 设置transform原点，使旋转更自然
        balloon.style.transformOrigin = 'center bottom';
        
        // 添加照片
        const photo = document.createElement('img');
        const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
        photo.src = randomPhoto;
        photo.className = 'balloon-photo';
        photo.alt = '气球照片';
        balloon.appendChild(photo);
        console.log('气球照片已添加', randomPhoto);
        
        // 添加到容器
        container.appendChild(balloon);
        console.log('气球已添加到容器', balloon);
        
        // 自定义上升动画
        balloon.style.transition = `top ${duration}s linear, opacity 0.5s ease`;
        
        // 开始上升
        setTimeout(() => {
            balloon.style.top = '-100px';
        }, 100);
        
        // 点击气球
        balloon.addEventListener('click', () => {
            if (timeLeft <= 0) return; // 游戏结束后不响应点击
            
            console.log('气球被点击');
            
            // 音效功能已移除
            
            balloon.style.opacity = '0';
            balloon.style.transform = 'scale(1.5)';
            balloon.style.transition = 'all 0.3s ease';
            score++;
            if (scoreElement) {
                scoreElement.textContent = score;
            }
            
            // 移除气球
            setTimeout(() => {
                if (container.contains(balloon)) {
                    container.removeChild(balloon);
                    console.log('气球已移除');
                }
            }, 300);
        });
        
        // 气球飞出屏幕后移除
        setTimeout(() => {
            if (container.contains(balloon)) {
                container.removeChild(balloon);
                console.log('气球飞出屏幕，已移除');
            }
        }, duration * 1000 + 500);
    }
    
    // 开始游戏
    function startGame() {
        console.log('开始游戏按钮被点击');
        
        // 隐藏开始游戏按钮
        if (startGameBtn) {
            startGameBtn.style.display = 'none';
        }
        
        // 游戏开始，添加game-started类以隐藏提示文字
        container.classList.add('game-started');
        console.log('游戏开始，添加game-started类');
        
        // 定期创建气球
        balloonInterval = setInterval(createBalloon, 800); // 每800ms创建一个气球
        console.log('气球创建定时器已启动');
        
        // 初始创建几个气球
        for (let i = 0; i < 5; i++) {
            setTimeout(createBalloon, i * 300);
        }
        
        // 开始倒计时
        startTimer();
        console.log('倒计时已启动');
    }
    
    // 开始倒计时
    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            if (timerElement) {
                timerElement.textContent = timeLeft;
            }
            
            // 游戏结束
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }
    
    // 游戏结束
    function endGame() {
        console.log('游戏结束');
        
        // 清除定时器
        clearInterval(balloonInterval);
        clearInterval(timerInterval);
        
        // 显示游戏结果
        if (gameResultElement) {
            if (score < 50) {
                // 嘲讽评价
                const taunts = [
                    '哈哈，你太菜了！再练练吧！',
                    '加油啊，气球都飞走了！',
                    '你是在给气球扇风吗？',
                    '气球表示：就这？',
                    '下次说不定能戳破更多哦！'
                ];
                const randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];
                gameResultElement.textContent = randomTaunt;
                gameResultElement.className = 'game-result taunt';
            } else {
                // 夸奖评价
                const praises = [
                    '哇，你太厉害了！真是个气球杀手！',
                    '简直是神射手啊！',
                    '气球见到你都要绕道走！',
                    '太牛了，你是怎么做到的？',
                    '满分！你就是气球克星！'
                ];
                const randomPraise = praises[Math.floor(Math.random() * praises.length)];
                gameResultElement.textContent = randomPraise;
                gameResultElement.className = 'game-result praise';
            }
        }
        
        // 显示下一步按钮
        if (nextToWishBtn) {
            nextToWishBtn.style.display = 'inline-block';
        }
    }
    
    // 确保容器有足够的高度
    container.style.height = '400px';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.border = '2px solid #f0f0f0';
    container.style.borderRadius = '10px';
    container.style.background = 'rgba(255, 255, 255, 0.8)';
    
    // 初始化游戏状态
    initGameState();
    
    // 添加开始游戏按钮的点击事件
    if (startGameBtn) {
        startGameBtn.addEventListener('click', startGame);
        console.log('开始游戏按钮点击事件已添加');
    }
    
    // 清理函数
    return function cleanup() {
        if (balloonInterval) {
            clearInterval(balloonInterval);
        }
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        if (container) {
            container.innerHTML = '';
        }
        console.log('气球游戏已清理');
    };
}

// 确保气球游戏函数被正确调用
console.log('准备初始化气球游戏');
try {
    // 只在游戏页面显示时初始化
    // 避免在页面加载时就初始化
    console.log('气球游戏初始化函数已定义');
} catch (e) {
    console.error('气球游戏初始化失败:', e);
}

// 祝福功能 - 现在直接在HTML中添加祝福
function initWishSection() {
    // 添加祝福功能
    const addWishBtn = document.getElementById('add-wish-btn');
    if (addWishBtn) {
        addWishBtn.addEventListener('click', () => {
            const wishContent = document.getElementById('wish-content').value;
            const wishAuthor = document.getElementById('wish-author').value;
            
            if (wishContent && wishAuthor) {
            // 创建新的祝福卡片
            const wishCard = document.createElement('div');
            wishCard.className = 'wish-card';
            wishCard.innerHTML = `
                <button class="delete-wish">×</button>
                <p>${wishContent}</p>
                <span class="wish-author">— ${wishAuthor}</span>
            `;
            
            // 添加删除事件监听器
            const deleteBtn = wishCard.querySelector('.delete-wish');
            deleteBtn.addEventListener('click', function() {
                wishCard.remove();
                saveWishes();
            });
            
            // 添加到祝福容器
            const wishesContainer = document.getElementById('wishes-container');
            wishesContainer.appendChild(wishCard);
            
            // 清空表单
            document.getElementById('wish-content').value = '';
            document.getElementById('wish-author').value = '';
            
            // 保存到localStorage
            saveWishes();
        }
        });
    }

    // 保存祝福到localStorage
    function saveWishes() {
        const wishesContainer = document.getElementById('wishes-container');
        const wishCards = wishesContainer.querySelectorAll('.wish-card');
        const wishes = [];
        
        wishCards.forEach(card => {
            // 只保存用户添加的祝福，不保存默认祝福
            if (!card.hasAttribute('data-default')) {
                const content = card.querySelector('p').textContent;
                const author = card.querySelector('.wish-author').textContent.replace('— ', '');
                wishes.push({ content, author });
            }
        });
        
        localStorage.setItem('birthdayWishes', JSON.stringify(wishes));
    }

    // 添加删除事件监听器到所有祝福卡片
    function addDeleteEventListeners() {
        const deleteBtns = document.querySelectorAll('.delete-wish');
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const wishCard = this.closest('.wish-card');
                wishCard.remove();
                saveWishes();
            });
        });
    }

    // 从localStorage加载祝福
    function loadWishes() {
        const savedWishes = localStorage.getItem('birthdayWishes');
        if (savedWishes) {
            try {
                const wishes = JSON.parse(savedWishes);
                const wishesContainer = document.getElementById('wishes-container');
                
                // 先保存默认祝福
                const defaultWishes = [];
                wishesContainer.querySelectorAll('.wish-card[data-default="true"]').forEach(card => {
                    defaultWishes.push(card.cloneNode(true));
                });
                
                // 清空容器
                wishesContainer.innerHTML = '';
                
                // 添加默认祝福
                defaultWishes.forEach(card => {
                    wishesContainer.appendChild(card);
                });
                
                // 添加保存的祝福
                wishes.forEach(wish => {
                    const wishCard = document.createElement('div');
                    wishCard.className = 'wish-card';
                    wishCard.innerHTML = `
                        <button class="delete-wish">×</button>
                        <p>${wish.content}</p>
                        <span class="wish-author">— ${wish.author}</span>
                    `;
                    wishesContainer.appendChild(wishCard);
                });
                
                // 添加删除事件监听器
                addDeleteEventListeners();
            } catch (e) {
                console.error('加载祝福失败:', e);
            }
        }
    }

    // 页面加载时加载祝福
    loadWishes();
    
    // 为默认祝福卡片添加删除事件监听器
    addDeleteEventListeners();
}

// 照片上传功能
function initPhotoSection() {
    const photoUpload = document.getElementById('photo-upload');
    const photoGallery = document.getElementById('photo-gallery');
    
    // 创建照片查看模态框
    createPhotoModal();

    // 从localStorage加载照片
    function loadPhotos() {
        const savedPhotos = localStorage.getItem('birthdayPhotos');
        if (savedPhotos) {
            try {
                const photos = JSON.parse(savedPhotos);
                photos.forEach(photoData => {
                    addPhotoToGallery(photoData);
                });
            } catch (e) {
                console.error('加载照片失败:', e);
            }
        }
    }

    // 保存照片到localStorage
    function savePhotos() {
        const photoItems = photoGallery.querySelectorAll('.photo-item');
        const photos = [];
        
        photoItems.forEach(item => {
            const img = item.querySelector('img');
            if (img) {
                photos.push(img.src);
            }
        });
        
        localStorage.setItem('birthdayPhotos', JSON.stringify(photos));
    }

    // 创建照片查看模态框
    function createPhotoModal() {
        // 检查模态框是否已存在
        if (!document.getElementById('photo-modal')) {
            const modal = document.createElement('div');
            modal.id = 'photo-modal';
            modal.style.cssText = `
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                z-index: 10000;
                justify-content: center;
                align-items: center;
            `;
            
            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.id = 'modal-img';
            modalImg.style.cssText = `
                max-width: 100%;
                max-height: 100vh;
                object-fit: contain;
            `;
            
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '×';
            closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: -40px;
                background-color: rgba(255, 107, 107, 0.8);
                color: white;
                border: none;
                border-radius: 50%;
                width: 35px;
                height: 35px;
                font-size: 20px;
                font-weight: bold;
                cursor: pointer;
                transition: opacity 0.3s ease;
            `;
            
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
            
            modalContent.appendChild(modalImg);
            modalContent.appendChild(closeBtn);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
        }
    }

    // 打开照片查看模态框
    function openPhotoModal(photoSrc) {
        const modal = document.getElementById('photo-modal');
        const modalImg = document.getElementById('modal-img');
        modalImg.src = photoSrc;
        modal.style.display = 'flex';
    }

    // 添加照片到相册
    function addPhotoToGallery(photoData) {
        const photoItem = document.createElement('div');
        photoItem.classList.add('photo-item');
        photoItem.innerHTML = `
            <img src="${photoData}" alt="生日照片">
            <button class="delete-photo">删除</button>
        `;
        photoGallery.appendChild(photoItem);
        
        // 添加删除事件
        const deleteBtn = photoItem.querySelector('.delete-photo');
        deleteBtn.addEventListener('click', () => {
            photoItem.remove();
            savePhotos();
        });
        
        // 添加点击放大事件
        const img = photoItem.querySelector('img');
        img.addEventListener('click', () => {
            openPhotoModal(img.src);
        });
        
        // 确保鼠标悬停时显示指针
        img.style.cursor = 'pointer';
    }

    // 处理照片上传
    photoUpload.addEventListener('change', (e) => {
        const files = e.target.files;
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    addPhotoToGallery(event.target.result);
                    savePhotos();
                };
                reader.readAsDataURL(file);
            }
        }
    });

    // 初始加载照片
    loadPhotos();
    
    // 如果localStorage中没有照片，添加默认照片
    if (!localStorage.getItem('birthdayPhotos')) {
        photos.forEach(photoPath => {
            addPhotoToGallery(photoPath);
        });
        savePhotos();
    }
    
    // 为所有现有照片添加点击放大事件监听器
    function addClickEventsToPhotos() {
        const photoImgs = document.querySelectorAll('#photo-gallery .photo-item img');
        photoImgs.forEach(img => {
            // 移除现有的点击事件监听器，避免重复添加
            img.replaceWith(img.cloneNode(true));
        });
        
        // 重新添加点击事件监听器
        const newPhotoImgs = document.querySelectorAll('#photo-gallery .photo-item img');
        newPhotoImgs.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                openPhotoModal(img.src);
            });
        });
    }
    
    // 调用函数为所有现有照片添加点击放大事件监听器
    addClickEventsToPhotos();
}

// 音乐功能
function initMusic() {
    console.log('开始初始化音乐功能');
    
    // 创建音频元素
    const audio = document.createElement('audio');
    // 使用本地的生日祝福歌
    audio.src = '生日祝福歌-格格.mp3';
    audio.loop = true;
    audio.volume = 0.5;
    document.body.appendChild(audio);
    console.log('音频元素创建完成');
    console.log('音乐文件路径:', audio.src);

    // 创建音乐控制按钮
    const musicBtn = document.createElement('button');
    musicBtn.innerHTML = '🎵';
    musicBtn.id = 'music-control';
    musicBtn.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        color: white;
        border: 3px solid white;
        font-size: 28px;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        z-index: 9999;
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
    `;
    document.body.appendChild(musicBtn);
    console.log('音乐按钮创建完成');

    // 音乐播放状态
    let isPlaying = false;

    // 点击控制音乐
    musicBtn.addEventListener('click', () => {
        console.log('音乐按钮被点击');
        if (isPlaying) {
            audio.pause();
            musicBtn.innerHTML = '🎵';
            musicBtn.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            console.log('音乐已暂停');
        } else {
            console.log('尝试播放音乐');
            audio.play().catch(e => {
                console.log('播放失败:', e);
                alert('音乐播放需要你的允许，请点击确定后再试一次');
            });
            musicBtn.innerHTML = '⏸️';
            musicBtn.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
            console.log('音乐已播放');
        }
        isPlaying = !isPlaying;
    });

    console.log('音乐功能初始化完成');
}

// 确保initMusic函数被调用
// 检查是否有其他错误阻止了函数执行
console.log('音乐功能初始化');
try {
    initMusic();
} catch (e) {
    console.error('音乐功能初始化失败:', e);
}

// 初始化所有功能
function init() {
    initPageNavigation();
    initWishSection();
    initPhotoSection();
    initMusic();

    // 添加返回顶部按钮
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        z-index: 1000;
        display: none;
    `;
    document.body.appendChild(backToTopBtn);

    // 滚动事件
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // 点击返回顶部
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 添加页面加载动画
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// 启动应用
window.onload = init;