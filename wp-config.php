<?php
/**
 * As configurações básicas do WordPress
 *
 * O script de criação wp-config.php usa esse arquivo durante a instalação.
 * Você não precisa usar o site, você pode copiar este arquivo
 * para "wp-config.php" e preencher os valores.
 *
 * Este arquivo contém as seguintes configurações:
 *
 * * Configurações do MySQL
 * * Chaves secretas
 * * Prefixo do banco de dados
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Configurações do MySQL - Você pode pegar estas informações com o serviço de hospedagem ** //
/** O nome do banco de dados do WordPress */
define( 'DB_NAME', 'sousas' );

/** Usuário do banco de dados MySQL */
define( 'DB_USER', 'root' );

/** Senha do banco de dados MySQL */
define( 'DB_PASSWORD', '' );

/** Nome do host do MySQL */
define( 'DB_HOST', 'localhost' );

/** Charset do banco de dados a ser usado na criação das tabelas. */
define( 'DB_CHARSET', 'utf8mb4' );

/** O tipo de Collate do banco de dados. Não altere isso se tiver dúvidas. */
define( 'DB_COLLATE', '' );

/**#@+
 * Chaves únicas de autenticação e salts.
 *
 * Altere cada chave para um frase única!
 * Você pode gerá-las
 * usando o {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org
 * secret-key service}
 * Você pode alterá-las a qualquer momento para invalidar quaisquer
 * cookies existentes. Isto irá forçar todos os
 * usuários a fazerem login novamente.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '[,ZXn/=[Wa2Qi4~A!hl_8wl9kujA5;}*S|8[z6{l`+tAdJGYeM!]ixwb~{3LRe@Z' );
define( 'SECURE_AUTH_KEY',  ';G2 {l8|}T>&M``t-^hAB ?dst<n%$` %WxZr~SHvsW<h{(Os9*4OZGw5L+9c/j1' );
define( 'LOGGED_IN_KEY',    'f,-yN#Yw#F;x-p;q,x[?-/yD#<cSf3v`v_awf2[sRyY.PM<a66[0ns)z4o>r(MeH' );
define( 'NONCE_KEY',        'N(,_RiEa$=nK3)0SvutD=}JSF0;(&En^p3dkU@FJ)AfSzD,b3v(TUyjt0}PJ5eq`' );
define( 'AUTH_SALT',        'U*|ue8xp)d5/-M77/PfhxH-dI` [kL!(Vft[v9dAeJ&DjB*|Fi/>)9~LCkGpxJEp' );
define( 'SECURE_AUTH_SALT', '3OZ{,*0uN)/5T9n*,gl(V1L&v.UT]&JO}4LTvcw4@o<he=bu%^+#K,uN,*ixt|Vs' );
define( 'LOGGED_IN_SALT',   'm>PQ6K/cAtA{Z5#,xcax,I&zpO*9L=Ziuu2x,y3R/&(d93#$[Es-%d.2#Kr4o&mH' );
define( 'NONCE_SALT',       'oFVXvFK0imNe~ct_W7)*[Xv],Bp12lAS+S-gZ7~+nXtn,V4>:{-44[!WGSA!9:TN' );

/**#@-*/

/**
 * Prefixo da tabela do banco de dados do WordPress.
 *
 * Você pode ter várias instalações em um único banco de dados se você der
 * um prefixo único para cada um. Somente números, letras e sublinhados!
 */
$table_prefix = 'wp_';

/**
 * Para desenvolvedores: Modo de debug do WordPress.
 *
 * Altere isto para true para ativar a exibição de avisos
 * durante o desenvolvimento. É altamente recomendável que os
 * desenvolvedores de plugins e temas usem o WP_DEBUG
 * em seus ambientes de desenvolvimento.
 *
 * Para informações sobre outras constantes que podem ser utilizadas
 * para depuração, visite o Codex.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Adicione valores personalizados entre esta linha até "Isto é tudo". */



/* Isto é tudo, pode parar de editar! :) */

/** Caminho absoluto para o diretório WordPress. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Configura as variáveis e arquivos do WordPress. */
require_once ABSPATH . 'wp-settings.php';
