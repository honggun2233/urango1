/**
 * URANGO — 아웃도어 액티비티 소셜 플랫폼
 * React Native 앱 화면 컴포넌트
 *
 * 포함 화면:
 *  - HomeScreen      : 카테고리 선택 + 추천 활동
 *  - SearchScreen    : 필터 검색
 *  - CreateScreen    : 활동 생성 (리더용)
 *  - ProfileScreen   : 사용자 프로필
 *  - MessagesScreen  : DM 목록
 *
 * 기술 스택: React Native + React Navigation
 * 컬러 시스템: Primary #028090 / Secondary #00A896 / Accent #02C39A
 *
 * @version 1.0.0
 * @author URANGO 프로젝트팀
 */

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, FlatList, SafeAreaView, StatusBar, Image,
} from 'react-native';

// ─── Design Tokens ──────────────────────────────────────────────
const COLORS = {
  primary:   '#028090',
  secondary: '#00A896',
  accent:    '#02C39A',
  dark:      '#212121',
  gray:      '#64748B',
  lightGray: '#F5F5F5',
  white:     '#FFFFFF',
  border:    '#E2E8F0',
};

const FONT = {
  heading:  { fontSize: 22, fontWeight: '700', color: COLORS.dark },
  subhead:  { fontSize: 16, fontWeight: '600', color: COLORS.dark },
  body:     { fontSize: 14, color: COLORS.dark },
  caption:  { fontSize: 12, color: COLORS.gray },
};

// ─── Shared Components ──────────────────────────────────────────

/** 별점 컴포넌트 */
const StarRating = ({ rating, count }) => (
  <View style={styles.starRow}>
    <Text style={styles.starText}>{'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}</Text>
    <Text style={styles.ratingNum}>{rating} {count && `(${count}회)`}</Text>
  </View>
);

/** 카테고리 배지 */
const CategoryBadge = ({ emoji, name, color }) => (
  <View style={[styles.catBadge, { backgroundColor: color || COLORS.primary }]}>
    <Text style={styles.catBadgeText}>{emoji} {name}</Text>
  </View>
);

/** 난이도 칩 */
const DifficultyChip = ({ level }) => {
  const colors = { Beginner: '#22c55e', Intermediate: '#f59e0b', Master: '#ef4444' };
  const labels = { Beginner: '초급', Intermediate: '중급', Master: '고급' };
  return (
    <View style={[styles.diffChip, { borderColor: colors[level] }]}>
      <Text style={[styles.diffChipText, { color: colors[level] }]}>{labels[level]}</Text>
    </View>
  );
};

/** 활동 카드 */
const ActivityCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.actCard} onPress={onPress} activeOpacity={0.85}>
    <View style={[styles.actCardHeader, { backgroundColor: item.color || COLORS.primary }]}>
      <CategoryBadge emoji={item.emoji} name={item.category} />
      <DifficultyChip level={item.level} />
    </View>
    <View style={styles.actCardBody}>
      <Text style={styles.actTitle}>{item.title}</Text>
      <View style={styles.actMeta}>
        <Text style={styles.metaItem}>📅 {item.date}</Text>
        <Text style={styles.metaItem}>📍 {item.location}</Text>
        <Text style={styles.metaItem}>👥 {item.current}/{item.max}명</Text>
      </View>
    </View>
    <View style={styles.actCardFooter}>
      <View style={styles.leaderRow}>
        <View style={[styles.leaderAvatar, { backgroundColor: item.color || COLORS.primary }]}>
          <Text style={styles.leaderInitial}>{item.leaderName[0]}</Text>
        </View>
        <View>
          <Text style={styles.leaderName}>{item.leaderName} 리더</Text>
          <StarRating rating={item.rating} count={item.ratingCount} />
        </View>
      </View>
      <TouchableOpacity style={[styles.joinBtn, { backgroundColor: item.color || COLORS.primary }]}>
        <Text style={styles.joinBtnText}>신청하기</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

// ─── Sample Data ────────────────────────────────────────────────
const ACTIVITIES = [
  {
    id: '1', category: 'Cycle', emoji: '🚴', color: COLORS.primary,
    title: '한강 라이딩 함께해요 🌊', date: '2026.03.15 토',
    location: '여의도 한강공원', current: 4, max: 6, level: 'Beginner',
    leaderName: '박민준', rating: 4.9, ratingCount: 48,
  },
  {
    id: '2', category: 'Mountain', emoji: '⛰️', color: COLORS.secondary,
    title: '북한산 둘레길 트레킹 🌿', date: '2026.03.20 목',
    location: '북한산국립공원', current: 7, max: 10, level: 'Intermediate',
    leaderName: '김서연', rating: 4.7, ratingCount: 31,
  },
  {
    id: '3', category: 'Run', emoji: '🏃', color: COLORS.accent,
    title: '올림픽공원 5K 러닝크루 🏅', date: '2026.03.22 토',
    location: '올림픽공원', current: 12, max: 15, level: 'Beginner',
    leaderName: '이준호', rating: 5.0, ratingCount: 67,
  },
  {
    id: '4', category: 'Bike', emoji: '🏍️', color: '#0891B2',
    title: '가평 바이크 투어링 🛣️', date: '2026.03.29 토',
    location: '청평IC 집결', current: 6, max: 8, level: 'Intermediate',
    leaderName: '정현우', rating: 5.0, ratingCount: 67,
  },
];

const CATEGORIES = [
  { id: 'cycle',    emoji: '🚴', name: 'Cycle',    count: 342, color: COLORS.primary },
  { id: 'bike',     emoji: '🏍️', name: 'Bike',     count: 187, color: '#0891B2' },
  { id: 'run',      emoji: '🏃', name: 'Run',       count: 426, color: COLORS.accent },
  { id: 'mountain', emoji: '⛰️', name: 'Mountain', count: 292, color: COLORS.secondary },
];

// ─── HomeScreen ─────────────────────────────────────────────────
export const HomeScreen = ({ navigation }) => {
  const [selectedCat, setSelectedCat] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>URANGO</Text>
          <Text style={styles.headerSub}>어디로 떠날까요?</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Text style={{ fontSize: 22 }}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Text style={styles.heroTitle}>함께 달리고,{'\n'}함께 오르고! 🚀</Text>
          <Text style={styles.heroSub}>검증된 리더와 함께하는 안전한 아웃도어</Text>
          <View style={styles.heroStats}>
            {[['1,247', '활성 활동'], ['8,924', '활동 리더'], ['42,100', '전체 회원']].map(([num, lbl]) => (
              <View key={lbl} style={styles.heroStat}>
                <Text style={styles.heroStatNum}>{num}</Text>
                <Text style={styles.heroStatLbl}>{lbl}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Category Grid */}
        <Text style={styles.sectionTitle}>카테고리 선택</Text>
        <View style={styles.catGrid}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.catCard, selectedCat === cat.id && { borderColor: cat.color, borderWidth: 2 }]}
              onPress={() => setSelectedCat(cat.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.catEmoji}>{cat.emoji}</Text>
              <Text style={styles.catName}>{cat.name}</Text>
              <Text style={styles.catCount}>{cat.count}개 활동</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recommended Activities */}
        <Text style={styles.sectionTitle}>⚡ 이번 주 추천 활동</Text>
        {ACTIVITIES.map(item => (
          <ActivityCard
            key={item.id}
            item={item}
            onPress={() => navigation?.navigate('ActivityDetail', { item })}
          />
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── SearchScreen ────────────────────────────────────────────────
export const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('전체');

  const filters = ['전체', '🚴 Cycle', '🏍️ Bike', '🏃 Run', '⛰️ Mountain', '이번주', '⚡ 즉시참여', '초급'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>활동 검색</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="리더, 장소, 코스 검색..."
          value={query}
          onChangeText={setQuery}
          placeholderTextColor={COLORS.gray}
        />
        <TouchableOpacity style={styles.searchBtn}>
          <Text style={styles.searchBtnText}>검색</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
        {filters.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
            onPress={() => setActiveFilter(f)}
          >
            <Text style={[styles.filterChipText, activeFilter === f && styles.filterChipTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.resultCount}>총 1,247개의 활동</Text>

      <FlatList
        data={ACTIVITIES}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ActivityCard item={item} onPress={() => {}} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

// ─── CreateScreen ────────────────────────────────────────────────
export const CreateScreen = () => {
  const [category, setCategory] = useState('Cycle');
  const [level, setLevel] = useState('Beginner');
  const [maxPeople, setMaxPeople] = useState('6-10명');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const cats = [{ e: '🚴', n: 'Cycle' }, { e: '🏍️', n: 'Bike' }, { e: '🏃', n: 'Run' }, { e: '⛰️', n: 'Mountain' }];
  const levels = ['Beginner', 'Intermediate', 'Master'];
  const peoples = ['2-5명', '6-10명', '11명 이상'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>➕ 활동 만들기</Text>
      </View>
      <ScrollView style={styles.formContainer}>
        {/* Category */}
        <Text style={styles.formLabel}>카테고리 선택</Text>
        <View style={styles.chipRow}>
          {cats.map(c => (
            <TouchableOpacity
              key={c.n}
              style={[styles.optChip, category === c.n && styles.optChipActive]}
              onPress={() => setCategory(c.n)}
            >
              <Text style={[styles.optChipText, category === c.n && styles.optChipTextActive]}>{c.e} {c.n}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.formLabel}>활동 제목</Text>
        <TextInput style={styles.formInput} placeholder="예: 한강 라이딩 함께해요!" value={title} onChangeText={setTitle} />

        <Text style={styles.formLabel}>📅 날짜</Text>
        <TextInput style={styles.formInput} placeholder="YYYY-MM-DD" />

        <Text style={styles.formLabel}>📍 장소</Text>
        <TextInput style={styles.formInput} placeholder="국가 > 지역 선택" />

        <Text style={styles.formLabel}>상세 코스</Text>
        <TextInput style={styles.formInput} placeholder="예: 여의도 한강공원 → 뚝섬 왕복" value={location} onChangeText={setLocation} />

        <Text style={styles.formLabel}>💪 난이도</Text>
        <View style={styles.chipRow}>
          {levels.map(l => (
            <TouchableOpacity key={l} style={[styles.optChip, level === l && styles.optChipActive]} onPress={() => setLevel(l)}>
              <Text style={[styles.optChipText, level === l && styles.optChipTextActive]}>
                {l === 'Beginner' ? '🟢 초급' : l === 'Intermediate' ? '🟡 중급' : '🔴 고급'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.formLabel}>👥 인원 제한</Text>
        <View style={styles.chipRow}>
          {peoples.map(p => (
            <TouchableOpacity key={p} style={[styles.optChip, maxPeople === p && styles.optChipActive]} onPress={() => setMaxPeople(p)}>
              <Text style={[styles.optChipText, maxPeople === p && styles.optChipTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.formLabel}>활동 소개</Text>
        <TextInput style={[styles.formInput, { height: 80, textAlignVertical: 'top' }]} multiline placeholder="활동에 대한 간단한 소개를 작성해주세요..." />

        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>🚀 활동 생성하기</Text>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── ProfileScreen ───────────────────────────────────────────────
export const ProfileScreen = () => {
  const menuItems = [
    { icon: '🏆', text: '내 활동 목록' },
    { icon: '👥', text: '팔로잉 / 팔로워' },
    { icon: '📸', text: '사진첩' },
    { icon: '⭐', text: '평가 내역' },
    { icon: '🔔', text: '알림 설정' },
    { icon: '⚙️', text: '계정 설정' },
    { icon: '🚪', text: '로그아웃', danger: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <ScrollView>
        <View style={styles.profileHeader}>
          <View style={styles.profileAvatar}><Text style={{ fontSize: 40 }}>👤</Text></View>
          <Text style={styles.profileName}>홍길동</Text>
          <Text style={styles.profileId}>@hong_outdoor</Text>
          <Text style={styles.profileRating}>⭐ 4.8점  •  리더</Text>
        </View>
        <View style={styles.statsRow}>
          {[['24', '리드 활동'], ['87', '참여 활동'], ['312', '팔로워']].map(([num, lbl], i) => (
            <View key={lbl} style={[styles.statItem, i > 0 && { borderLeftWidth: 1, borderLeftColor: COLORS.border }]}>
              <Text style={styles.statNum}>{num}</Text>
              <Text style={styles.statLbl}>{lbl}</Text>
            </View>
          ))}
        </View>
        <View style={{ padding: 16 }}>
          <Text style={styles.sectionTitle}>선호 카테고리</Text>
          <View style={styles.chipRow}>
            <View style={[styles.filterChip, styles.filterChipActive]}><Text style={styles.filterChipTextActive}>🚴 Cycle</Text></View>
            <View style={[styles.filterChip, styles.filterChipActive]}><Text style={styles.filterChipTextActive}>⛰️ Mountain</Text></View>
          </View>
          <Text style={styles.sectionTitle}>메뉴</Text>
          {menuItems.map(item => (
            <TouchableOpacity key={item.text} style={styles.menuItem}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={[styles.menuText, item.danger && { color: '#ef4444' }]}>{item.text}</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── MessagesScreen ──────────────────────────────────────────────
export const MessagesScreen = () => {
  const dms = [
    { id: '1', name: '박민준', initial: '박', color: COLORS.primary, preview: '안녕하세요! 한강 라이딩 신청 확인했습니다 😊', time: '방금', unread: 2 },
    { id: '2', name: '김서연', initial: '김', color: COLORS.secondary, preview: '북한산 트레킹 준비물 안내드립니다 🎒', time: '1시간 전', unread: 1 },
    { id: '3', name: '정현우', initial: '정', color: '#0891B2', preview: '가평 투어 잘 다녀왔습니다! 다음에 또 봬요', time: '어제', unread: 0 },
    { id: '4', name: '이준호', initial: '이', color: COLORS.accent, preview: '5K 러닝 같이 달렸던 분들 단체 채팅방 만들었어요!', time: '2일 전', unread: 0 },
    { id: '5', name: '최다현', initial: '최', color: '#6366f1', preview: '다음 도봉산 트레킹도 기대해주세요! ⛰️', time: '3일 전', unread: 0 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.header}><Text style={styles.headerTitle}>💬 메시지</Text></View>
      <Text style={styles.resultCount}>읽지 않은 메시지 3개</Text>
      <FlatList
        data={dms}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.dmItem}>
            <View style={[styles.dmAvatar, { backgroundColor: item.color }]}>
              <Text style={styles.dmInitial}>{item.initial}</Text>
            </View>
            <View style={styles.dmInfo}>
              <Text style={styles.dmName}>{item.name} 리더</Text>
              <Text style={styles.dmPreview} numberOfLines={1}>{item.preview}</Text>
            </View>
            <View style={styles.dmRight}>
              <Text style={styles.dmTime}>{item.time}</Text>
              {item.unread > 0 && (
                <View style={styles.unreadBadge}><Text style={styles.unreadText}>{item.unread}</Text></View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

// ─── Styles ─────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container:        { flex: 1, backgroundColor: COLORS.lightGray },
  header:           { backgroundColor: COLORS.primary, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle:      { color: COLORS.white, fontSize: 20, fontWeight: '700', letterSpacing: 1 },
  headerSub:        { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 2 },
  notifBtn:         { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },

  heroBanner:       { backgroundColor: COLORS.primary, padding: 24 },
  heroTitle:        { color: COLORS.white, fontSize: 22, fontWeight: '700', lineHeight: 30 },
  heroSub:          { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 6 },
  heroStats:        { flexDirection: 'row', marginTop: 16, gap: 20 },
  heroStat:         { alignItems: 'center' },
  heroStatNum:      { color: COLORS.white, fontSize: 20, fontWeight: '700' },
  heroStatLbl:      { color: 'rgba(255,255,255,0.8)', fontSize: 10, marginTop: 2 },

  sectionTitle:     { fontSize: 15, fontWeight: '700', color: COLORS.dark, padding: 16, paddingBottom: 8 },
  catGrid:          { flexDirection: 'row', flexWrap: 'wrap', padding: 16, paddingTop: 0, gap: 12 },
  catCard:          { width: '46%', backgroundColor: COLORS.white, borderRadius: 16, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2, borderWidth: 2, borderColor: 'transparent' },
  catEmoji:         { fontSize: 36, marginBottom: 8 },
  catName:          { fontSize: 16, fontWeight: '700', color: COLORS.dark },
  catCount:         { fontSize: 11, color: COLORS.gray, marginTop: 4 },

  actCard:          { backgroundColor: COLORS.white, marginHorizontal: 16, marginBottom: 12, borderRadius: 14, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10, elevation: 2 },
  actCardHeader:    { padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  catBadge:         { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  catBadgeText:     { color: COLORS.white, fontSize: 11, fontWeight: '600' },
  diffChip:         { borderWidth: 1, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2 },
  diffChipText:     { fontSize: 11, fontWeight: '600' },
  actCardBody:      { padding: 14 },
  actTitle:         { fontSize: 15, fontWeight: '700', color: COLORS.dark, marginBottom: 8 },
  actMeta:          { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  metaItem:         { fontSize: 12, color: COLORS.gray },
  actCardFooter:    { padding: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: COLORS.border, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  leaderRow:        { flexDirection: 'row', alignItems: 'center', gap: 8 },
  leaderAvatar:     { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  leaderInitial:    { color: COLORS.white, fontSize: 13, fontWeight: '700' },
  leaderName:       { fontSize: 12, color: COLORS.gray },
  starRow:          { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  starText:         { color: '#FFB800', fontSize: 12 },
  ratingNum:        { fontSize: 11, color: COLORS.gray },
  joinBtn:          { borderRadius: 20, paddingHorizontal: 16, paddingVertical: 7 },
  joinBtnText:      { color: COLORS.white, fontSize: 12, fontWeight: '600' },

  searchBar:        { backgroundColor: COLORS.white, padding: 12, flexDirection: 'row', gap: 8 },
  searchInput:      { flex: 1, borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, color: COLORS.dark },
  searchBtn:        { backgroundColor: COLORS.primary, borderRadius: 24, paddingHorizontal: 18, paddingVertical: 10, alignItems: 'center', justifyContent: 'center' },
  searchBtnText:    { color: COLORS.white, fontSize: 13, fontWeight: '600' },
  filterRow:        { backgroundColor: COLORS.white, paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  filterChip:       { borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 5, marginRight: 8 },
  filterChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterChipText:   { fontSize: 12, color: COLORS.gray },
  filterChipTextActive: { color: COLORS.white },
  resultCount:      { fontSize: 12, color: COLORS.gray, padding: 12, paddingBottom: 4 },

  formContainer:    { padding: 20 },
  formLabel:        { fontSize: 13, fontWeight: '600', color: COLORS.gray, marginBottom: 8, marginTop: 16 },
  formInput:        { borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 12, padding: 12, fontSize: 14, color: COLORS.dark, backgroundColor: COLORS.white },
  chipRow:          { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optChip:          { borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 24, paddingHorizontal: 16, paddingVertical: 7 },
  optChipActive:    { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  optChipText:      { fontSize: 13, color: COLORS.gray },
  optChipTextActive:{ color: COLORS.white },
  submitBtn:        { backgroundColor: COLORS.primary, borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 24 },
  submitBtnText:    { color: COLORS.white, fontSize: 16, fontWeight: '700' },

  profileHeader:    { backgroundColor: COLORS.primary, padding: 30, alignItems: 'center', paddingBottom: 50 },
  profileAvatar:    { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)', marginBottom: 12 },
  profileName:      { color: COLORS.white, fontSize: 20, fontWeight: '700', marginBottom: 4 },
  profileId:        { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
  profileRating:    { color: COLORS.accent, fontSize: 15, marginTop: 8 },
  statsRow:         { flexDirection: 'row', backgroundColor: COLORS.white, margin: 16, marginTop: -30, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 },
  statItem:         { flex: 1, alignItems: 'center' },
  statNum:          { fontSize: 20, fontWeight: '700', color: COLORS.primary },
  statLbl:          { fontSize: 11, color: COLORS.gray, marginTop: 4 },
  menuItem:         { backgroundColor: COLORS.white, borderRadius: 12, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 },
  menuIcon:         { fontSize: 20, width: 36, textAlign: 'center' },
  menuText:         { flex: 1, fontSize: 14, fontWeight: '500', color: COLORS.dark, marginLeft: 8 },
  menuArrow:        { color: COLORS.border, fontSize: 18 },

  dmItem:           { backgroundColor: COLORS.white, marginHorizontal: 12, marginBottom: 10, borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 },
  dmAvatar:         { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  dmInitial:        { color: COLORS.white, fontSize: 18, fontWeight: '700' },
  dmInfo:           { flex: 1, marginHorizontal: 12, minWidth: 0 },
  dmName:           { fontSize: 14, fontWeight: '600', color: COLORS.dark },
  dmPreview:        { fontSize: 12, color: COLORS.gray, marginTop: 3 },
  dmRight:          { alignItems: 'flex-end', gap: 4 },
  dmTime:           { fontSize: 11, color: COLORS.gray },
  unreadBadge:      { backgroundColor: COLORS.primary, borderRadius: 9, width: 18, height: 18, alignItems: 'center', justifyContent: 'center' },
  unreadText:       { color: COLORS.white, fontSize: 10, fontWeight: '700' },
});

// ─── Default Export (App Entry) ──────────────────────────────────
export default function App() {
  const [tab, setTab] = useState('home');

  const screens = {
    home:     <HomeScreen />,
    search:   <SearchScreen />,
    create:   <CreateScreen />,
    profile:  <ProfileScreen />,
    messages: <MessagesScreen />,
  };

  const navItems = [
    { key: 'home',     icon: '🏠', label: '홈' },
    { key: 'search',   icon: '🔍', label: '검색' },
    { key: 'create',   icon: '➕', label: '생성' },
    { key: 'profile',  icon: '👤', label: '프로필' },
    { key: 'messages', icon: '💬', label: '메시지' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>{screens[tab]}</View>
      <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: COLORS.border, paddingBottom: 8 }}>
        {navItems.map(item => (
          <TouchableOpacity
            key={item.key}
            style={{ flex: 1, alignItems: 'center', paddingVertical: 8 }}
            onPress={() => setTab(item.key)}
          >
            <Text style={{ fontSize: 22, color: tab === item.key ? COLORS.primary : '#aaa' }}>{item.icon}</Text>
            <Text style={{ fontSize: 10, color: tab === item.key ? COLORS.primary : '#aaa', fontWeight: tab === item.key ? '600' : '400', marginTop: 2 }}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
